const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.resolve(__dirname, '../MTR-Widget.js'), 'utf8');
const NOW = Date.parse('2026-10-25T12:00:00+08:00');
class FixedDate extends Date { constructor(...v) { super(...(v.length ? v : [NOW])); } static now() { return NOW; } }
const train = (time, dest = 'LMC', extra = {}) => ({time: '2026-10-25 ' + time, dest, plat: '1', timeType: 'D', ...extra});
const payload = (sta = 'SHT', extra = {}) => ({status: 1, curr_time: '2026-10-25 12:00:00', data: {['EAL-' + sta]: {curr_time: '2026-10-25 12:00:00', UP: [train('12:03:00'), train('12:06:00', 'LOW'), train('12:09:00')], DOWN: [train('12:02:00', 'ADM')], ...extra}}});
function harness(options = {}) {
  const widgets = [], calls = [];
  class Element {
    constructor() { this.children = []; }
    addStack() { const v = new Element(); this.children.push(v); return v; }
    addText(value) { const v = {text: value}; this.children.push(v); return v; }
    addSpacer() {} setPadding() {} layoutVertically() {} centerAlignContent() {} topAlignContent() {}
    async presentSmall() { this.preview = 'small'; } async presentMedium() { this.preview = 'medium'; } async presentLarge() { this.preview = 'large'; }
  }
  const context = vm.createContext({Date: FixedDate, console,
    args: {widgetParameter: options.parameter || '', queryParameters: options.query || {}},
    config: {runsInWidget: options.inWidget !== false, widgetFamily: options.family || 'medium'},
    ListWidget: Element, Color: class {constructor(value) {this.value = value;}}, Size: class {constructor(w,h) {this.width=w;this.height=h;}},
    Font: {systemFont: size => size, semiboldSystemFont: size => size},
    URLScheme: {forRunningScript: () => 'scriptable:///run?scriptName=MTR', forOpeningScript: () => 'scriptable:///open?scriptName=MTR'},
    Script: {setWidget: w => widgets.push(w), complete: () => {}},
    Request: class {
      constructor(url) {this.url = url;}
      async loadString() {
        const sta = new URL(this.url).searchParams.get('sta'); calls.push(sta);
        const response = options.responses && options.responses[sta];
        if (response instanceof Error) throw response;
        this.response = {statusCode: options.status || 200};
        return response === undefined ? JSON.stringify(payload(sta)) : typeof response === 'string' ? response : JSON.stringify(response);
      }
    }
  });
  const api = vm.runInContext('(async () => {' + source.replace(/await main\(\);\s*$/, '') + '\nreturn {settings, groupsFor, timestamp, makeGroup, main};})()', context);
  return {api, widgets, calls};
}
function texts(node) { return (node.children || []).flatMap(c => c.text === undefined ? texts(c) : [c.text]); }
async function run(options) { const h = harness(options); const api = await h.api; await api.main(); return {...h, api, text: texts(h.widgets[0]).join('\n')}; }
test('all ten lines, names, per-station directions and destinations', async () => {
  const {api} = harness(); const a = await api;
  const cfg = a.settings('LINE=東鐵綫&station=上水，落馬洲&direction=up,down&destination=落馬洲,ALL&count=4');
  assert.equal(cfg.code, 'EAL'); assert.equal(cfg.stations.join(','), 'SHS,LMC');
  assert.equal(cfg.destinations.join(','), 'LMC,'); assert.equal(a.groupsFor(cfg).length, 2);
  for (const [line,sta] of [['TML','TUM'],['TKL','POA'],['TCL','TUC'],['AEL','AIR'],['EAL','SHT'],['SIL','ADM'],['TWL','TSW'],['ISL','CHW'],['KTL','WHA'],['DRL','DIS']]) assert.equal(a.settings(`line=${line}&station=${sta}`).code,line);
});
test('invalid settings are rejected rather than silently changing stations', async () => {
  const a = await harness().api;
  for (const raw of ['line=ZZZ','line=TWL&station=SHT','station=SHT,SHS&direction=UP,DOWN,BOTH','direction=SIDE','destination=ZZZ','count=0','count=5','count=1.5','foo=EAL','station=','station=%ZZ','SHT','station=SHT,SHT,SHT,SHT,SHT,SHT,SHT,SHT,SHT']) assert.throws(() => a.settings(raw), undefined, raw);
});
test('Hong Kong dates and midnight are independent of device timezone', async () => {
  const a = await harness().api;
  assert.equal(a.timestamp('2026-10-26 00:01:00') - a.timestamp('2026-10-25 23:59:00'), 120000);
  assert.equal(a.timestamp('2026-10-25 12:00:00'), NOW);
  assert.ok(Number.isNaN(a.timestamp('12:00:00')));
});
test('sort, filter old trains and destination; ignore dummy ttnt', async () => {
  const a = await harness().api, cfg = a.settings('station=SHS&direction=UP&destination=LMC');
  const p = payload('SHS', {UP: [train('12:09:00'),train('11:58:00'),train('12:03:00','LOW'),train('12:02:00','LMC',{ttnt:'999'})]});
  const g = a.makeGroup(cfg,a.groupsFor(cfg)[0],{payload:p,data:p.data['EAL-SHS']},NOW);
  assert.equal(g.trains.length,2); assert.equal(g.trains[0].time,'2026-10-25 12:02:00');
});
test('stale, future and invalid source times are visibly marked', async () => {
  const a = await harness().api, cfg = a.settings('');
  for(const curr_time of ['2026-10-25 11:50:00','2026-10-25 12:10:00','bad']) {
    const p = payload('SHT',{curr_time});
    assert.match(a.makeGroup(cfg,a.groupsFor(cfg)[0],{payload:p,data:p.data['EAL-SHT']},NOW).warning,/时间异常/);
  }
});
test('a failed station does not hide the other station', async () => {
  const r = await run({parameter:'station=SHS,LMC&direction=UP,DOWN&destination=LMC,ALL',responses:{SHS:Error('offline')}});
  assert.match(r.text,/网络失败/); assert.match(r.text,/金鐘/); assert.match(r.text,/12:02/);
});
test('HTTP, malformed JSON, service notices and missing data are explicit', async () => {
  for(const [options,pattern] of [[{status:429},/请求过于频繁/],[{status:503},/HTTP 503/],[{responses:{SHT:'<html>'}},/无法解析/],[{responses:{SHT:{status:0,message:'暂停'}}},/暂停/],[{responses:{SHT:{status:1,data:{}}}},/暂未提供/],[{responses:{SHT:'null'}},/暂时无法提供/]]) {
    assert.match((await run(options)).text,pattern);
  }
});
test('empty destination match does not imply no later trains', async () => {
  const r = await run({parameter:'direction=UP&destination=ADM'});
  assert.match(r.text,/暂无符合终点/); assert.match(r.text,/往金鐘/);
});
test('small/medium/large cap groups and request each visible station once', async () => {
  const parameter = 'station=SHT,SHS,LMC&direction=BOTH';
  for(const [family,calls,omitted] of [['small','SHT',5],['medium','SHT',4],['large','SHT,SHS',2]]) {
    const r = await run({family,parameter});
    assert.equal(r.calls.join(','),calls); assert.match(r.text,new RegExp('\\+'+omitted+'组'));
    assert.match(r.text,/10\/25 12:00 港時/);
    assert.equal(r.widgets[0].refreshAfterDate.getTime(),NOW+60000);
  }
});
test('departure, platform, racecourse and delay remain visible', async () => {
  const p = payload('SHT',{UP:[train('12:03:00','LMC',{route:'RAC'})]}); p.isdelay='Y';
  const r = await run({responses:{SHT:p}});
  for(const value of ['開出','1台','經馬場','列车延误']) assert.ok(r.text.includes(value));
  assert.doesNotMatch(r.text,/分钟|即将/);
});
test('tap link restores exactly the widget parameters and preview size', async () => {
  const parameter = 'line=EAL&station=上水,落馬洲&direction=UP,DOWN&destination=LMC,ALL';
  const r = await run({parameter,family:'large'});
  const url = new URL(r.widgets[0].url);
  assert.equal(url.searchParams.get('widgetParameter'),parameter);
  const app = await run({inWidget:false,query:{widgetParameter:url.searchParams.get('widgetParameter'),family:url.searchParams.get('family')}});
  assert.equal(app.widgets[0].preview,'large'); assert.equal(app.calls.join(','),'SHS,LMC');
});
test('invalid parameters and unsupported sizes render a useful error widget', async () => {
  for(const options of [{parameter:'count=9'},{family:'accessoryCircular'}]) {
    const r = await run(options); assert.match(r.text,/参数错误/); assert.equal(r.calls.length,0);
  }
});

