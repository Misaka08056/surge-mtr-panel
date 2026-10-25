# mtr班次显示 · Scriptable 桌面小组件

这是 Surge MTR 项目的独立 Scriptable 版本，直接读取港铁官方 Next Train API。无需运行 Surge，无需 API 密钥或定位权限。支持原项目的十条线路及繁体站名、车站代码。

## 一键导入到 iPhone

1. 安装并打开 Scriptable。
2. 点 **[📲 一键导入 Scriptable](https://github.com/Misaka08056/surge-mtr-panel/releases/download/scriptable/MTR-Widget.scriptable)**，打开 `MTR-Widget.scriptable` 后按 Scriptable 提示确认导入，脚本名称为 **mtr班次显示**。
3. 如果 Safari 先下载了文件，在下载列表打开它，再点 **分享 → Scriptable**。也可在“文件”App 中找到该文件并分享给 Scriptable。不同 iOS 版本的打开方式可能不同。
4. 在 Scriptable 运行导入的脚本，默认预览「落马洲开出／上水往落马洲」的中号组件。
5. 长按 iPhone 桌面空白处，添加 **Scriptable 中号小组件**；长按组件 → **编辑小组件** → **Script** 选择 **mtr班次显示**，在 **Parameter** 填写下方参数。
6. 回到桌面。点按组件可打开 Scriptable，按这个组件的参数重新查询并预览；桌面组件由系统另行刷新，打开预览不保证桌面立即同步。

此入口提供 Scriptable 原生的 `.scriptable` 导入文件，内含完整代码和名称、图标信息，不依赖第三方导入器。首次导入需要系统或 Scriptable 的打开／确认操作，网页不能绕过这些操作，也不能自动把小组件放到桌面。

### 手动安装备用方式

若系统没有显示 Scriptable 选项，打开 [MTR-Widget.js](MTR-Widget.js)，复制完整代码，在 Scriptable 点 **＋**、粘贴并保存，命名为 **mtr班次显示**。再按上面的第4、5步操作。

## 常用参数

上水往落马洲，另显示落马洲向南开出的列车：

```text
line=EAL&station=SHS,LMC&direction=UP,DOWN&destination=LMC,ALL&count=3
```

仅查看上水往落马洲，适合小号组件：

```text
line=EAL&station=SHS&direction=UP&destination=LMC
```

沙田双向：

```text
line=EAL&station=SHT&direction=BOTH
```

繁体站名也可以，例如：

```text
line=東鐵綫&station=上水,落馬洲&direction=UP,DOWN&destination=落馬洲,ALL
```

参数请粘贴为一行，不含代码块的反引号。Parameter 留空时使用脚本顶部的 `DEFAULTS`；也可直接修改该默认配置。参数名和英文代码不区分大小写。

| 参数 | 默认 | 说明 |
| --- | --- | --- |
| line | EAL | 线路代码或繁体名称，站名与原项目相同 |
| station | LMC,SHS | 同一线路的车站，多个用英文或中文逗号分隔，最多8站 |
| direction | DOWN,UP | UP / DOWN / BOTH；一个通用值，或按站点顺序填写 |
| destination | ALL,LMC | ALL 或终点站代码／繁体名称；支持按站点填写 |
| count | 3 | 每组保留1至4班，再按组件尺寸限制显示数量 |

`destination` 筛选列车实际终点；接口每方向最多返回未来4班。筛选后为空，不意味着之后没有车。轻铁不在本接口范围内。

## 尺寸与显示范围

一个「车站＋方向」算一组，BOTH 算两组。先按车站顺序，再按 UP、DOWN 排序。

| 尺寸 | 最多组数 | 每组最多班次 |
| --- | --- | --- |
| 小号 | 1 | 1 |
| 中号 | 2 | 2；有异常提示时减为1 |
| 大号 | 4 | 3 |

超出的组数会在右上角标为 `+N组`，只请求当前可显示的车站。需要更多内容时，拆成多个组件或选大号。上面的「上水＋落马洲」配置使用两个单向组，正好适合中号。

在 Scriptable 内运行默认预览中号。修改脚本顶部的 `PREVIEW_SIZE` 为 `small` 或 `large` 可预览其他尺寸；桌面组件以添加时选定的尺寸为准。

## 外观与更新

- 配色跟随系统的浅色／深色模式，最近一班使用大号等宽时间，终点与月台放在下方，后续班次单独分隔。数据更新时间始终保留在底部。
- 默认显示「落马洲开出」及「上水往落马洲」；Parameter 留空即可使用。已有明确参数时仍按参数显示，其他车站也继续支持。
- 大号在仅有一至两组时改用上下排列的宽卡片，三至四组时使用双列布局。
- 升级时重新点击一键导入入口导入新版。若 Scriptable 生成了同名副本，请编辑桌面组件，选择新版脚本；原有 Parameter 可继续使用。

## 时间与刷新

- 组件以**预计到站／开出时刻**为主要信息，附列车终点、月台和经马场提示。所有显示时间均为香港时间，日期计算显式使用 UTC+8。
- 不显示会随组件滞留而失真的静态「还有几分钟」倒计时。请结合底部的**月／日、数据时间**判断信息是否仍可参考。
- 脚本设置约1分钟后可再次刷新，但这只是向系统提供的最早刷新时间，**不保证每分钟刷新，更不能保证每10秒刷新**。实际由 iOS 调度，与 Surge 的面板刷新参数不同。
- 获取时数据已超过2分钟、时间明显超前或来源时间缺失，会标出时间异常；收到延误标记也会提示。组件显示之后若一直未被系统刷新，脚本无法自行改变其状态，请留意底部时间。
- 请求失败直接显示错误，不用旧缓存冒充新数据。一个站失败时，其他站仍可显示。
- API 返回暂无班次、终点站该方向无车、非服务时段等情况，不会编造预计时间。
- 建议保留系统提供的组件背景；iOS 的着色或透明显示模式可能改变配色。

## 验证与来源

已通过 Node.js 的 Scriptable API 模拟测试，覆盖参数、十条线路、目的地筛选、跨午夜、错误与超时、过期数据、显示组数和点按参数传递；并确认港铁沙田实时接口返回成功。**尚未在实体 iPhone 的 Scriptable 中验证导入、原生排版和实际后台刷新。**

仓库内测试：`node --test tests/scriptable-widget.test.cjs`（Node.js 18或更新版本）。修改 `MTR-Widget.js` 后，先执行 `node scripts/build-scriptable.cjs` 重新生成导入包；测试会验证导入包与脚本一致。

`.scriptable` 导出结构参考 [Import-Script 的原生导出示例](https://github.com/supermamon/scriptable-scripts/blob/master/Import-Script/Import-Script.scriptable)。

- [原项目及车站代码表](https://github.com/Misaka08056/surge-mtr-panel)
- [港铁官方接口示例](https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=SHT&lang=TC)
- [Scriptable 小组件与刷新说明](https://docs.scriptable.app/listwidget/)
- [Scriptable 参数说明](https://docs.scriptable.app/args/)

代码沿用项目的 MIT License。港铁数据权利及使用条件以数据提供方为准。
