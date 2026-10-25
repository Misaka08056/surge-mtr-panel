// Variables used by Scriptable.
// icon-color: cyan; icon-glyph: train;
// 港鐵班次 · Scriptable Home Screen widget · MIT License.
// Standalone: no Surge, API key, location permission, or external modules needed.
// Widget Parameter example:
// line=EAL&station=SHS,LMC&direction=UP,DOWN&destination=LMC,ALL&count=3
const DEFAULTS = {
  line: 'EAL', station: 'SHT', direction: 'BOTH', destination: 'ALL', count: '3'
};
const PREVIEW_SIZE = 'medium'; // small / medium / large, when run inside Scriptable


const LINES = {
  "TML": {
    "name": "屯馬綫",
    "up": "屯門",
    "down": "烏溪沙",
    "stations": {
      "TUM": "屯門",
      "SIH": "兆康",
      "TIS": "天水圍",
      "LOP": "朗屏",
      "YUL": "元朗",
      "KSR": "錦上路",
      "TWW": "荃灣西",
      "MEF": "美孚",
      "NAC": "南昌",
      "AUS": "柯士甸",
      "ETS": "尖東",
      "HUH": "紅磡",
      "HOM": "何文田",
      "TKW": "土瓜灣",
      "SUW": "宋皇臺",
      "KAT": "啟德",
      "DIH": "鑽石山",
      "HIK": "顯徑",
      "TAW": "大圍",
      "CKT": "車公廟",
      "STW": "沙田圍",
      "CIO": "第一城",
      "SHM": "石門",
      "TSH": "大水坑",
      "HEO": "恆安",
      "MOS": "馬鞍山",
      "WKS": "烏溪沙"
    }
  },
  "TKL": {
    "name": "將軍澳綫",
    "up": "寶琳及康城",
    "down": "北角",
    "stations": {
      "POA": "寶琳",
      "HAH": "坑口",
      "LHP": "康城",
      "TKO": "將軍澳",
      "TIK": "調景嶺",
      "YAT": "油塘",
      "QUB": "鰂魚涌",
      "NOP": "北角"
    }
  },
  "TCL": {
    "name": "東涌綫",
    "up": "東涌",
    "down": "香港",
    "stations": {
      "TUC": "東涌",
      "SUN": "欣澳",
      "TSY": "青衣",
      "LAK": "荔景",
      "NAC": "南昌",
      "OLY": "奧運",
      "KOW": "九龍",
      "HOK": "香港"
    }
  },
  "AEL": {
    "name": "機場快綫",
    "up": "機場及博覽館",
    "down": "香港",
    "stations": {
      "AWE": "博覽館",
      "AIR": "機場",
      "TSY": "青衣",
      "KOW": "九龍",
      "HOK": "香港"
    }
  },
  "EAL": {
    "name": "東鐵綫",
    "up": "羅湖及落馬洲",
    "down": "金鐘",
    "stations": {
      "LMC": "落馬洲",
      "LOW": "羅湖",
      "SHS": "上水",
      "FAN": "粉嶺",
      "TWO": "太和",
      "TAP": "大埔墟",
      "UNI": "大學",
      "RAC": "馬場",
      "FOT": "火炭",
      "SHT": "沙田",
      "TAW": "大圍",
      "KOT": "九龍塘",
      "MKK": "旺角東",
      "HUH": "紅磡",
      "EXC": "會展",
      "ADM": "金鐘"
    }
  },
  "SIL": {
    "name": "南港島綫",
    "up": "海怡半島",
    "down": "金鐘",
    "stations": {
      "SOH": "海怡半島",
      "LET": "利東",
      "WCH": "黃竹坑",
      "OCP": "海洋公園",
      "ADM": "金鐘"
    }
  },
  "TWL": {
    "name": "荃灣綫",
    "up": "荃灣",
    "down": "中環",
    "stations": {
      "TSW": "荃灣",
      "TWH": "大窩口",
      "KWH": "葵興",
      "KWF": "葵芳",
      "LAK": "荔景",
      "MEF": "美孚",
      "LCK": "荔枝角",
      "CSW": "長沙灣",
      "SSP": "深水埗",
      "PRE": "太子",
      "MOK": "旺角",
      "YMT": "油麻地",
      "JOR": "佐敦",
      "TST": "尖沙咀",
      "ADM": "金鐘",
      "CEN": "中環"
    }
  },
  "ISL": {
    "name": "港島線",
    "up": "柴灣",
    "down": "堅尼地城",
    "stations": {
      "CHW": "柴灣",
      "HFC": "杏花邨",
      "SKW": "筲箕灣",
      "SWH": "西灣河",
      "TAK": "太古",
      "QUB": "鰂魚涌",
      "NOP": "北角",
      "FOH": "炮台山",
      "TIH": "天后",
      "CAB": "銅鑼灣",
      "WAC": "灣仔",
      "ADM": "金鐘",
      "CEN": "中環",
      "SHW": "上環",
      "SYP": "西營盤",
      "HKU": "香港大學",
      "KET": "堅尼地城"
    }
  },
  "KTL": {
    "name": "觀塘綫",
    "up": "調景嶺",
    "down": "黃埔",
    "stations": {
      "TIK": "調景嶺",
      "YAT": "油塘",
      "LAT": "藍田",
      "KWT": "觀塘",
      "NTK": "牛頭角",
      "KOB": "九龍灣",
      "CHH": "彩虹",
      "DIH": "鑽石山",
      "WTS": "黃大仙",
      "LOF": "樂富",
      "KOT": "九龍塘",
      "SKM": "石硤尾",
      "PRE": "太子",
      "MOK": "旺角",
      "YMT": "油麻地",
      "HOM": "何文田",
      "WHA": "黃埔"
    }
  },
  "DRL": {
    "name": "迪士尼綫",
    "up": "欣澳",
    "down": "迪士尼",
    "stations": {
      "SUN": "欣澳",
      "DIS": "迪士尼"
    }
  }
};


const COLORS = {EAL:'53B7E8',TML:'9A3820',AEL:'00888A',TCL:'F7943E',TKL:'7D499D',SIL:'B5BD00',TWL:'E2231A',ISL:'0075C2',KTL:'00AB4E',DRL:'E86BA2'};

function parseParameter(raw) {
  const result = {};
  if (!String(raw || '').trim()) return result;
  String(raw).trim().split('&').forEach(part => {
    const at = part.indexOf('=');
    if (at < 1) throw Error('参数请使用 line=EAL&station=SHT 格式。');
    const decode = s => decodeURIComponent(s.replace(/\+/g, ' ')).trim();
    const key = decode(part.slice(0, at)).toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(DEFAULTS, key)) throw Error('未知参数：' + key);
    const value = decode(part.slice(at + 1));
    if (!value) throw Error(key + ' 不能为空。');
    result[key] = value;
  });
  return result;
}
function normalize(value) { return String(value).replace(/[綫線线站\s]/g, '').toUpperCase(); }
function stationCode(value, line) {
  return Object.keys(line.stations).find(code => code === normalize(value) || normalize(line.stations[code]) === normalize(value));
}
function settings(raw) {
  const options = Object.assign({}, DEFAULTS, parseParameter(raw));
  const code = Object.keys(LINES).find(id => id === options.line.toUpperCase() || normalize(LINES[id].name) === normalize(options.line));
  if (!code) throw Error('线路无效，请填写 EAL、TML 等代码或繁体线路名。');
  const line = LINES[code];
  const stations = options.station.split(/[,，]/).map(value => {
    const sta = stationCode(value.trim(), line);
    if (!sta) throw Error('车站「' + value + '」不属于' + line.name + '。请使用繁体站名或代码。');
    return sta;
  });
  if (stations.length > 8) throw Error('最多支持8个车站；请按组件容量设置。');
  const perStation = value => {
    const values = value.split(/[,，]/).map(v => v.trim());
    if (values.length !== 1 && values.length !== stations.length) throw Error('方向和终点须填一个通用值，或与车站数量一致。');
    return stations.map((_, i) => values.length === 1 ? values[0] : values[i]);
  };
  const directions = perStation(options.direction).map(v => {
    const dir = v.toUpperCase();
    if (!['UP', 'DOWN', 'BOTH'].includes(dir)) throw Error('direction 请填 UP、DOWN 或 BOTH。');
    return dir;
  });
  const destinations = perStation(options.destination).map(v => {
    if (v.toUpperCase() === 'ALL') return null;
    const dest = stationCode(v, line);
    if (!dest) throw Error('destination 请填本线路繁体站名、代码或 ALL。');
    return dest;
  });
  const count = Number(options.count);
  if (!Number.isInteger(count) || count < 1 || count > 4) throw Error('count 请填1至4。');
  return {code, line, stations, directions, destinations, count};
}
// Every source time is explicitly UTC+8, including on devices in other timezones.
function timestamp(value) {
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(String(value))
    ? Date.parse(value.replace(' ', 'T') + '+08:00') : NaN;
}
function groupsFor(cfg) {
  const groups = [];
  cfg.stations.forEach((sta, i) => {
    (cfg.directions[i] === 'BOTH' ? ['UP', 'DOWN'] : [cfg.directions[i]]).forEach(dir => {
      groups.push({sta, dir, dest: cfg.destinations[i]});
    });
  });
  return groups;
}
async function fetchStation(code, sta) {
  try {
    const request = new Request('https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=' + code + '&sta=' + sta + '&lang=TC');
    request.timeoutInterval = 8;
    const body = await request.loadString();
    const status = Number(request.response && request.response.statusCode);
    if (status !== 200) return {error: status === 429 ? '请求过于频繁，请稍后重试' : '接口异常 HTTP ' + (status || '?')};
    let payload;
    try { payload = JSON.parse(body); } catch (_) { return {error: '接口数据无法解析'}; }
    if (!payload || Number(payload.status) !== 1) return {error: '港铁提示：' + (payload && payload.message || '暂时无法提供数据')};
    const data = payload.data && payload.data[code + '-' + sta];
    if (!data || typeof data !== 'object') return {error: '港铁暂未提供此站班次'};
    return {payload, data};
  } catch (_) { return {error: '网络失败或超时，点按重试'}; }
}
function makeGroup(cfg, group, result, now) {
  const model = Object.assign({}, group, {trains: [], updated: null, warning: '', error: result.error || ''});
  if (model.error) return model;
  const {payload, data} = result;
  const updated = data.curr_time || payload.curr_time;
  const sourceTime = timestamp(updated);
  model.updated = Number.isFinite(sourceTime) ? updated : null;
  if (!Number.isFinite(sourceTime) || Math.abs(now - sourceTime) > 120000) model.warning = '⚠ 数据时间异常';
  if (String(payload.isdelay || payload.Isdelay || '').toUpperCase() === 'Y') model.warning += (model.warning ? ' · 延误' : '⚠ 列车延误');
  model.trains = (Array.isArray(data[group.dir]) ? data[group.dir] : [])
    .filter(train => train && Number.isFinite(timestamp(train.time)) && timestamp(train.time) >= now - 30000 && (!group.dest || String(train.dest).toUpperCase() === group.dest))
    .sort((a, b) => timestamp(a.time) - timestamp(b.time)).slice(0, cfg.count);
  return model;
}
function label(parent, value, size, color, bold, lines) {
  const text = parent.addText(String(value));
  text.font = bold ? Font.semiboldSystemFont(size) : Font.systemFont(size);
  text.textColor = new Color(color || 'F0F4FA');
  text.lineLimit = lines || 1;
  text.minimumScaleFactor = 0.7;
  return text;
}
function card(parent, cfg, group, family) {
  const box = parent.addStack();
  box.layoutVertically();
  box.setPadding(5, 6, 5, 6);
  box.backgroundColor = new Color('182438');
  box.cornerRadius = 10;
  // Conservative width fits the smaller iPhone medium widgets as well.
  // Small uses the available width; large has more vertical room.
  if (family !== 'small') box.size = new Size(124, 0);
  const arrow = group.dir === 'UP' ? '↑' : '↓';
  label(box, cfg.line.stations[group.sta] + ' ' + arrow, family === 'medium' ? 11 : 12, COLORS[cfg.code], true);
  box.addSpacer(3);
  if (group.error) {
    label(box, group.error, 11, 'FFBA79', false, 3);
    return;
  }
  if (group.warning) {
    label(box, group.warning, 9, 'FFBA79');
    box.addSpacer(2);
  }
  const limit = family === 'small' || (family === 'medium' && group.warning) ? 1 : family === 'medium' ? 2 : 3;
  if (!group.trains.length) {
    label(box, group.dest ? '暂无符合终点的班次' : '暂无班次／非服务时段', 10, 'ADBBD0', false, 2);
    label(box, '往' + (group.dest ? cfg.line.stations[group.dest] : group.dir === 'UP' ? cfg.line.up : cfg.line.down), 9, 'ADBBD0');
    return;
  }
  group.trains.slice(0, limit).forEach((train, i) => {
    if (i) box.addSpacer(3);
    const row = box.addStack();
    row.centerAlignContent();
    label(row, train.time.slice(11, 16), family === 'small' ? 22 : family === 'medium' ? 14 : 15, 'F0F4FA', true);
    row.addSpacer(5);
    label(row, cfg.line.stations[train.dest] || train.dest || '?', 11, 'F0F4FA', true);
    const departure = String(train.timeType || train.timetype || '').toUpperCase() === 'D';
    const details = [departure ? '開出' : '到站'];
    if (train.plat) details.push(train.plat + '台');
    if (train.route === 'RAC') details.push('經馬場');
    label(box, details.join(' · '), family === 'medium' ? 8 : 9, 'ADBBD0');
  });
}
function makeWidget(cfg, groups, total, family, raw) {
  const widget = new ListWidget();
  widget.setPadding(10, 10, 10, 10);
  widget.backgroundColor = new Color('0C1422');
  widget.refreshAfterDate = new Date(Date.now() + 60000);
  // Widget Parameter is not automatically passed when the script is opened.
  widget.url = URLScheme.forRunningScript() + '&widgetParameter=' + encodeURIComponent(raw) + '&family=' + family;
  const header = widget.addStack();
  header.centerAlignContent();
  label(header, family === 'small' ? cfg.code + ' 班次' : cfg.line.name + ' · 班次', 12, COLORS[cfg.code], true);
  header.addSpacer();
  const omitted = total - groups.length;
  if (omitted) label(header, '+' + omitted + '组', 9, 'ADBBD0');
  widget.addSpacer(6);
  if (family === 'small') card(widget, cfg, groups[0], family);
  else {
    for (let i = 0; i < groups.length; i += 2) {
      if (i) widget.addSpacer(8);
      const row = widget.addStack();
      row.topAlignContent();
      card(row, cfg, groups[i], family);
      if (groups[i + 1]) { row.addSpacer(); card(row, cfg, groups[i + 1], family); }
    }
  }
  widget.addSpacer();
  widget.addSpacer(3);
  const times = groups.map(group => group.updated).filter(Boolean).sort();
  // Include source date: a widget can remain visible across midnight or offline.
  const footer = times.length ? times[0].slice(5, 16).replace('-', '/') + ' 港時' : '无有效数据 · 点按重试';
  label(widget, footer, 9, 'ADBBD0');
  return widget;
}
function errorWidget(error) {
  const widget = new ListWidget();
  widget.backgroundColor = new Color('0C1422');
  widget.setPadding(12, 12, 12, 12);
  label(widget, '港鐵班次 · 参数错误', 13, 'FFBA79', true);
  widget.addSpacer(8);
  label(widget, error.message || String(error), 11, 'F0F4FA', false, 5);
  widget.url = URLScheme.forOpeningScript();
  widget.refreshAfterDate = new Date(Date.now() + 300000);
  return widget;
}
async function main() {
  const query = args.queryParameters || {};
  const family = config.runsInWidget ? config.widgetFamily : query.family || PREVIEW_SIZE;
  const raw = config.runsInWidget ? args.widgetParameter || '' : query.widgetParameter || '';
  let widget;
  try {
    if (!['small', 'medium', 'large'].includes(family)) throw Error('请添加桌面小、中或大尺寸组件。');
    const cfg = settings(raw);
    const all = groupsFor(cfg);
    const visible = all.slice(0, family === 'small' ? 1 : family === 'medium' ? 2 : 4);
    // Request only the stations which can actually be shown. Each station once.
    const stations = [...new Set(visible.map(group => group.sta))];
    const values = await Promise.all(stations.map(sta => fetchStation(cfg.code, sta)));
    const results = {};
    stations.forEach((sta, i) => { results[sta] = values[i]; });
    const now = Date.now();
    const groups = visible.map(group => makeGroup(cfg, group, results[group.sta], now));
    widget = makeWidget(cfg, groups, all.length, family, raw);
  } catch (error) { widget = errorWidget(error); }
  Script.setWidget(widget);
  if (!config.runsInWidget) {
    if (family === 'small') await widget.presentSmall();
    else if (family === 'large') await widget.presentLarge();
    else await widget.presentMedium();
  }
  Script.complete();
}

await main();

