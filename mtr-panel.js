// 港鐵即時班次 Surge Panel. MIT License.
// Station codes and directions: MTR Next Train Data Dictionary v1.7.
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

(function () {
  let finished = false;
  let title = '港鐵即時班次';
  let color = '#53B7E8';
  function done(content) {
    if (finished) return;
    finished = true;
    $done({ title, content, icon: 'tram.fill', 'icon-color': color });
  }
  function parseArgs(raw) {
    const args = {};
    String(raw || '').split('&').forEach(function (part) {
      const at = part.indexOf('=');
      if (at < 0) return;
      const key = decodeURIComponent(part.slice(0, at));
      args[key] = decodeURIComponent(part.slice(at + 1).replace(/\+/g, ' ')).trim();
    });
    return args;
  }
  // All API timestamps are Hong Kong time, irrespective of the device timezone.
  function timestamp(s) {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(String(s))) return NaN;
    return Date.parse(s.replace(' ', 'T') + '+08:00');
  }
  function clock(s) { return Number.isFinite(timestamp(s)) ? s.slice(11, 16) : '--:--'; }
  function normalize(s) { return s.replace(/[綫線线站\s]/g, '').toUpperCase(); }
  function stationCode(value, line) {
    const name = normalize(value);
    return Object.keys(line.stations).find(function (code) {
      return code === name || normalize(line.stations[code]) === name;
    });
  }
  try {
    const args = parseArgs(typeof $argument === 'undefined' ? '' : $argument);
    const lineValue = args.line || 'EAL';
    const code = Object.keys(LINES).find(function (id) {
      return id === lineValue.toUpperCase() || normalize(LINES[id].name) === normalize(lineValue);
    });
    if (!code) throw Error('线路无效，请填写 EAL、TML 等代码或繁体线路名。');
    const line = LINES[code];
    const sta = stationCode(args.station || 'SHT', line);
    if (!sta) throw Error('车站不属于所选线路，请填写繁体站名或车站代码。');
    title = line.name + ' · ' + line.stations[sta];
    const colors = {EAL:'#53B7E8',TML:'#9A3820',AEL:'#00888A',TCL:'#F7943E',TKL:'#7D499D',SIL:'#B5BD00',TWL:'#E2231A',ISL:'#0075C2',KTL:'#00AB4E',DRL:'#E86BA2'};
    color = colors[code];
    const direction = (args.direction || 'BOTH').toUpperCase();
    if (!['UP', 'DOWN', 'BOTH'].includes(direction)) throw Error('DIRECTION 请填写 UP、DOWN 或 BOTH。');
    const limit = Number(args.count || '3');
    if (!Number.isInteger(limit) || limit < 1 || limit > 4) throw Error('COUNT 请填写 1 至 4。');
    let dest = null;
    if (args.destination && args.destination.toUpperCase() !== 'ALL') {
      dest = stationCode(args.destination, line);
      if (!dest) throw Error('DESTINATION 请填写本线路终点的繁体站名或代码，或 ALL。');
    }
    const url = 'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=' + code + '&sta=' + sta + '&lang=TC';
    setTimeout(function () { done('请求超时，请点击面板刷新。'); }, 11000);
    $httpClient.get({url, timeout: 10}, function (error, response, body) {
      if (finished) return;
      try {
        if (error) return done('网络请求失败，请点击面板刷新。');
        if (!response || Number(response.status) !== 200) {
          return done(Number(response && response.status) === 429 ? '请求过于频繁，请稍后刷新。' : '接口异常（HTTP ' + (response ? response.status : '?') + '），请稍后刷新。');
        }
        const payload = JSON.parse(body);
        if (Number(payload.status) !== 1) return done('港铁服务提示：' + (payload.message || '暂时无法提供数据'));
        const data = payload.data && payload.data[code + '-' + sta];
        if (!data) return done('港铁暂未提供此站班次数据。');
        const updated = data.curr_time || payload.curr_time;
        const sourceTime = timestamp(updated);
        const now = Date.now();
        const stale = Number.isFinite(sourceTime) && (now - sourceTime > 120000 || sourceTime - now > 120000);
        const content = [];
        if (stale) content.push('⚠️ 数据时间异常，以下为接口记录，请刷新核实');
        if ((payload.isdelay || payload.Isdelay || '').toUpperCase() === 'Y') content.push('⚠️ 港铁提示列车延误');
        const dirs = direction === 'BOTH' ? ['UP', 'DOWN'] : [direction];
        dirs.forEach(function (dir) {
          content.push((dir === 'UP' ? '↑ 往' : '↓ 往') + (dest ? line.stations[dest] : dir === 'UP' ? line.up : line.down));
          const trains = (Array.isArray(data[dir]) ? data[dir] : []).filter(function (train) {
            const t = timestamp(train.time);
            return Number.isFinite(t) && (stale || t >= now - 60000) && (!dest || train.dest === dest);
          }).sort(function (a, b) { return timestamp(a.time) - timestamp(b.time); }).slice(0, limit);
          if (!trains.length) content.push(dest ? '暂无符合目的地的班次（仅筛选接口返回的未来最多4班）' : '暂无即将到站班次／可能非服务时段');
          trains.forEach(function (train) {
            const diff = (timestamp(train.time) - now) / 60000;
            const departure = String(train.timeType || train.timetype || '').toUpperCase() === 'D';
            const eta = stale ? '' : diff <= 1 ? ' · 即将' + (departure ? '开出' : '到站') : ' · ' + Math.ceil(diff) + '分钟';
            content.push(clock(train.time) + (departure ? ' 开' : ' 到') + eta + ' · ' + (line.stations[train.dest] || train.dest || '未知终点') + (train.plat ? ' · ' + train.plat + '台' : '') + (train.route === 'RAC' ? ' · 经马场' : ''));
          });
        });
        content.push('更新 ' + (Number.isFinite(sourceTime) ? updated.slice(11) : '时间未知') + ' · 香港时间');
        done(content.join('\n'));
      } catch (e) { done('数据解析失败：' + e.message); }
    });
  } catch (e) { done('参数错误：' + e.message); }
})();

