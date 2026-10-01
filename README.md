# 港鐵即時班次 · Surge iOS 面板

直接使用港铁官方 Next Train API，显示预计到站/开出时间、剩余分钟、列车终点、月台及经马场提示。无需 MITM 或额外 API 密钥。支持官方接口的 10 条铁路线路；轻铁使用另一套 API，本模块不包含轻铁。

## 导入

在 Surge 的模块页面选择从 URL 安装，粘贴：

https://raw.githubusercontent.com/Misaka08056/surge-mtr-panel/main/MTR-Next-Train.sgmodule

启用模块，进入参数编辑，填写线路和车站。在策略页面查看面板并点击刷新。脚本会由 Surge 从 GitHub 下载。需要支持模块参数的 Surge 版本。

## 参数

| 参数 | 默认值 | 用途 |
| --- | --- | --- |
| LINE | EAL | 线路代码或繁体线路名，例如 東鐵綫 |
| STATION | SHT | 繁体站名或代码；多个用逗号分隔，例如 SHS,LMC，最多8站 |
| DIRECTION | BOTH | BOTH/UP/DOWN；一个值通用，或按车站顺序填写，例如 UP,DOWN |
| COUNT | 3 | 每个车站每方向显示 1–4 班 |
| DESTINATION | ALL | ALL 或列车终点；一个值通用，或按车站顺序填写，例如 LMC,ALL |
| UPDATE_INTERVAL | 10 | 面板更新间隔（秒），建议至少 10 |

参数名与模块占位符区分大小写；英文代码输入不区分大小写。站名使用下表的繁体写法。车站、方向、目的地支持英文或中文逗号分隔；参数不要含 & 或双引号。切换线路时请同时修改车站。

例如：从上水查看开往罗湖的列车，填写 LINE=EAL、STATION=上水、DIRECTION=UP、DESTINATION=羅湖、COUNT=4。

DESTINATION 按列车实际终点筛选，不是路线规划，也不是经过该站的所有列车。接口每方向最多提供未来 4 班；筛选后无结果不意味着之后没有车。

## 同时显示上水往落马洲和落马洲开出

| 参数 | 填写值 |
| --- | --- |
| LINE | EAL |
| STATION | SHS,LMC |
| DIRECTION | UP,DOWN |
| DESTINATION | LMC,ALL |
| COUNT | 4 |
| UPDATE_INTERVAL | 10 |

第1组是上水站往落马洲，第2组是落马洲站向南开出的列车。按车站填写顺序分组显示。一站请求失败时其他车站仍显示。方向和目的地只填一个值时会应用于所有车站；填写多个值时，数量须与车站相同。所有车站使用同一LINE线路。站点较多时可降低COUNT以缩短面板。

已安装旧版：先更新模块，保留或重新填写上述参数。新版脚本URL带有 ?v=2，以避开旧脚本缓存。若仍未生效，请移除模块后用原链接重新导入。

## 线路与方向

| 代码 | 线路 | UP 常见方向 | DOWN 常见方向 |
| --- | --- | --- | --- |
| TML | 屯馬綫 | 屯門 | 烏溪沙 |
| TKL | 將軍澳綫 | 寶琳及康城 | 北角 |
| TCL | 東涌綫 | 東涌 | 香港 |
| AEL | 機場快綫 | 機場及博覽館 | 香港 |
| EAL | 東鐵綫 | 羅湖及落馬洲 | 金鐘 |
| SIL | 南港島綫 | 海怡半島 | 金鐘 |
| TWL | 荃灣綫 | 荃灣 | 中環 |
| ISL | 港島線 | 柴灣 | 堅尼地城 |
| KTL | 觀塘綫 | 調景嶺 | 黃埔 |
| DRL | 迪士尼綫 | 欣澳 | 迪士尼 |

方向只是概括，实际终点以每班列车显示为准，可能有中途终点。迪士尼线 UP 往欣澳、DOWN 往迪士尼。

## 车站代码

### 屯馬綫（TML）

屯門 TUM · 兆康 SIH · 天水圍 TIS · 朗屏 LOP · 元朗 YUL · 錦上路 KSR · 荃灣西 TWW · 美孚 MEF · 南昌 NAC · 柯士甸 AUS · 尖東 ETS · 紅磡 HUH · 何文田 HOM · 土瓜灣 TKW · 宋皇臺 SUW · 啟德 KAT · 鑽石山 DIH · 顯徑 HIK · 大圍 TAW · 車公廟 CKT · 沙田圍 STW · 第一城 CIO · 石門 SHM · 大水坑 TSH · 恆安 HEO · 馬鞍山 MOS · 烏溪沙 WKS

### 將軍澳綫（TKL）

寶琳 POA · 坑口 HAH · 康城 LHP · 將軍澳 TKO · 調景嶺 TIK · 油塘 YAT · 鰂魚涌 QUB · 北角 NOP

### 東涌綫（TCL）

東涌 TUC · 欣澳 SUN · 青衣 TSY · 荔景 LAK · 南昌 NAC · 奧運 OLY · 九龍 KOW · 香港 HOK

### 機場快綫（AEL）

博覽館 AWE · 機場 AIR · 青衣 TSY · 九龍 KOW · 香港 HOK

### 東鐵綫（EAL）

落馬洲 LMC · 羅湖 LOW · 上水 SHS · 粉嶺 FAN · 太和 TWO · 大埔墟 TAP · 大學 UNI · 馬場 RAC · 火炭 FOT · 沙田 SHT · 大圍 TAW · 九龍塘 KOT · 旺角東 MKK · 紅磡 HUH · 會展 EXC · 金鐘 ADM

### 南港島綫（SIL）

海怡半島 SOH · 利東 LET · 黃竹坑 WCH · 海洋公園 OCP · 金鐘 ADM

### 荃灣綫（TWL）

荃灣 TSW · 大窩口 TWH · 葵興 KWH · 葵芳 KWF · 荔景 LAK · 美孚 MEF · 荔枝角 LCK · 長沙灣 CSW · 深水埗 SSP · 太子 PRE · 旺角 MOK · 油麻地 YMT · 佐敦 JOR · 尖沙咀 TST · 金鐘 ADM · 中環 CEN

### 港島線（ISL）

柴灣 CHW · 杏花邨 HFC · 筲箕灣 SKW · 西灣河 SWH · 太古 TAK · 鰂魚涌 QUB · 北角 NOP · 炮台山 FOH · 天后 TIH · 銅鑼灣 CAB · 灣仔 WAC · 金鐘 ADM · 中環 CEN · 上環 SHW · 西營盤 SYP · 香港大學 HKU · 堅尼地城 KET

### 觀塘綫（KTL）

調景嶺 TIK · 油塘 YAT · 藍田 LAT · 觀塘 KWT · 牛頭角 NTK · 九龍灣 KOB · 彩虹 CHH · 鑽石山 DIH · 黃大仙 WTS · 樂富 LOF · 九龍塘 KOT · 石硤尾 SKM · 太子 PRE · 旺角 MOK · 油麻地 YMT · 何文田 HOM · 黃埔 WHA

### 迪士尼綫（DRL）

欣澳 SUN · 迪士尼 DIS

## 数据与刷新说明

- 时间均为香港时间（UTC+8），跨午夜也按完整日期计算。
- 分钟数由预计时间与运行时刻计算；不使用官方标记为 dummy 的 ttnt、valid、source 字段。
- 东铁 timeType/timetype 为 D 时显示“开”，其他显示“到”；经马场显示专门提示。
- 数据时间超过两分钟或明显超前时显示异常提示并隐藏倒计时；网络错误不会伪装成实时班次。
- 无班次可能是非服务时段、终点站该方向无车，或官方没有提供数据。
- 官方数据每 10 秒更新。Surge 在显示或切换面板时检查更新间隔，不保证后台持续运行；旧面板内容会保留到下次刷新，请留意底部数据时间。
- 本模块使用独立 Panel 和 Script；不添加分流规则，不需要解密流量。

## 验证

已用实际东铁沙田 API 数据和模拟 Surge 全局变量验证脚本，覆盖参数、目的地筛选、断网、超时、接口异常、延误、过期数据和跨午夜。尚未在实体 iPhone Surge 上验证排版与导入行为。

## 来源

- [香港政府开放数据平台：港铁实时列车服务资讯](https://data.gov.hk/tc-data/dataset/mtr-data2-nexttrain-data)
- [港铁数据字典 v1.7](https://opendata.mtr.com.hk/doc/Next_Train_DataDictionary_v1.7.pdf)
- [港铁 API](https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=SHT&lang=TC)
- [Sammy Fung 网站](https://sammy.hk/mtrtrain/?line=EAL)及其[开源项目](https://github.com/sammyfung/mtrtrain)提供了数据源定位和繁体车站名称参考。
- [Surge 模块参数](https://manual.nssurge.com/profile/module.html)与[面板文档](https://manual.nssurge.com/tools/panel.html)。

模块脚本原创；代码按 MIT License 发布。港铁数据的知识产权属于香港铁路有限公司，使用数据须遵守数据提供方的条款。
