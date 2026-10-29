# 生日祝福 · 李嘉琪

一个温柔、梦幻一点的生日祝福页。整页只有三件事：慢慢说几句祝福、放一点好看的东西、最后留一个只给她的彩蛋。

- 纯前端，没有框架、没有构建步骤，改 `config.js` 就能改全部文案
- 手机优先，竖屏 / 横屏 / 桌面都适配，可切深色 / 浅色
- 星空、气球、烟花、彩纸、聊天框、逐句祝福都保留
- 彩蛋：最底部有一颗小按钮，点开是一段 C++ 代码，代码开头那段注释是一首诗《未命名变量》

## 直接打开 / 本地预览

双击 `index.html` 用 Edge 或 Chrome 打开即可。

想在手机上试，先在 PowerShell 里起一个本地服务器：

```powershell
cd D:\gift2\happybirthday
python -m http.server 8080
```

然后让手机和电脑连同一个 Wi-Fi，访问 `http://电脑的局域网IP:8080`。

## 怎么改

### 1. 改文案和顺序：`config.js`

```js
const CONFIG = {
  name: "李嘉琪",              // 名字
  music: "./music/hbd.mpeg",   // 背景音乐，不想放就写 ""
  colors: { primary, accent, dark, light },
  defaultMode: "dark",         // "dark" 或 "light"
  sections: [ ... ],           // 页面上从上到下播放的每一段
};
```

`sections` 里一个 `{ ... }` 就是一段：删掉就删掉这一段，上下挪动就换顺序。

### 2. 改彩蛋：`script/components/easteregg.js`

文件最上面的 `CODE` 就是彩蛋里的整段代码。面板里的「诗」是从这段代码开头 `/* ... */` 注释里自动读出来的，所以改注释，诗也会跟着变。

### 3. 段落类型

| type | 作用 | 可写字段 |
| --- | --- | --- |
| `greeting` | 开场问候 + 名字 | `title`、`subtitle` |
| `announcement` | 一句大字 | `text` |
| `chatbox` | 像聊天一样打字 | `message`、`buttonText` |
| `ideas` | 一句一句浮现的祝福 | `lines`（可含 `<strong>` 高亮） |
| `quote` | 一张小卡片 | `text`、`author`（可省） |
| `stars` | 星空 | `count` |
| `balloons` | 气球 | `count` |
| `fireworks` | 烟花 | `count` |
| `confetti` | 彩纸 | `count` |
| `closing` | 结尾 + 重播 | `text`、`replayText` |
| `easteregg` | 底部彩蛋按钮 | `label` |

## 文件

```text
happybirthday/
├── index.html                  页面骨架
├── config.js                   ← 只改这个就能换文案和顺序
├── style/main.css              全部样式（含彩蛋面板）
├── script/
│   ├── main.js                 引擎：读 config、加载组件、编排动画
│   └── components/
│       ├── greeting.js  announcement.js  chatbox.js  ideas.js
│       ├── quote.js     stars.js  balloons.js  fireworks.js
│       ├── confetti.js  closing.js
│       └── easteregg.js        ← 彩蛋的代码和诗
├── img/                        气球 SVG、图标（另有原项目示例照片 irene.jpg，页面未使用）
├── music/hbd.mpeg              背景音乐
├── README.original.md          原仓库英文说明（保留备份）
└── LICENSE                     MIT
```

## 部署

最省事的是把 `happybirthday` 文件夹拖到 Netlify Drop，或者推到 GitHub Pages。
国内访问更稳的做法是腾讯云 COS / 阿里云 OSS 的静态网站托管。

## 几点提醒

- GSAP 和 SweetAlert2 已经存进 `script/vendor/`，**断网、直接双击 `index.html` 也能完整播放**，不再依赖任何 CDN。
- 音乐是 `music/hbd.mpeg`，介意版权的话可以换成自己录的一段。
- `img/irene.jpg` 是原项目作者的照片，页面并没有引用；如果要公开部署，建议删掉它。

## 相对原仓库改了什么

| 文件 | 改动 |
| --- | --- |
| `config.js` | 全部文案换成中文；名字改为李嘉琪；去掉 `countdown`、`profile`；保留 greeting / announcement / chatbox / ideas / quote / stars / balloons / fireworks / confetti / closing，并新增 `easteregg` |
| `index.html` | `lang` 改 `zh-CN`；标题与描述改中文；去掉 Google Fonts（国内会卡首屏）；音频去掉 `autoplay`、加 `preload="none"`，避免空 `src` 触发请求；两个库改成本地引用 |
| `script/vendor/` | 新增：GSAP 3.12.5 与 SweetAlert2 11.14.5 的本地副本，断网可用 |
| `script/main.js` | 音乐询问弹窗改中文；SweetAlert 加载失败时直接开始播放，不再白屏 |
| `script/components/closing.js` | 重播按钮修复：原来用 `.from()` 加 CSS `opacity` 过渡，按钮最后停在 `opacity: 0`（看不见）；改成显式 `fromTo` |
| `script/components/ideas.js` | 高亮从实心色块改成半透明底 + 强调色，更轻一点 |
| `script/components/balloons.js` | `alt` 改中文 |
| `style/main.css` | 中文字体栈；名字渐变色；引号字体、去掉中文斜体；彩蛋面板样式；补 `[hidden]` 兜底 |
| `script/components/easteregg.js` | 新增：彩蛋按钮 + 诗 / 代码面板（含极简 C++ 高亮） |
