/**
 * ✨ 想改内容，改这一个文件就够了 ✨
 *
 * 页面上的每一段，都对应下面 sections 里的一个对象，按顺序播放。
 *
 *   · 删掉某一段  →  把整个 { ... } 删掉（记得连逗号）
 *   · 换个顺序    →  把整段上下挪一挪
 *   · 改文字      →  只改引号里的内容
 *
 * 可用的片段类型：
 *   greeting      开场问候：一句称呼 + 她的名字
 *   announcement  一句话，大字宣布
 *   chatbox       像聊天一样，一个字一个字打出来
 *   ideas         一句一句慢慢浮现的祝福（想加几句就加几行）
 *   quote         一张小卡片，放一句最想说的话
 *   stars         星空（背景层）
 *   balloons      气球（漂浮层）
 *   fireworks     烟花（一簇光点散开）
 *   confetti      彩纸（轻轻炸开的小圆点）
 *   closing       结尾 + 「再看一遍」
 *   easteregg     页面最下面那颗小按钮，点开是藏起来的彩蛋
 *
 * 没写进 sections 的片段，对应的 js 文件不会被加载，也不会影响页面。
 */

const CONFIG = {
  // ── 给谁 ──────────────────────────────────────────────────────
  name: "李嘉琪",                // ← 名字会出现在开场和彩蛋里
  music: "./music/hbd.mpeg",     // 背景音乐；不想放音乐就写成 ""

  // ── 配色 ──────────────────────────────────────────────────────
  // 右上角有个 ☀️/🌙 按钮，看的人可以自己切深色 / 浅色
  colors: {
    primary: "#ec8fb2",          // 主色：名字、星星、大标题
    accent: "#8b9cf5",           // 辅色：按钮、被强调的词
    dark: {
      background: "#141428",     // 深夜的蓝紫色
      text: "#f4f2fb",
    },
    light: {
      background: "#fbf7fb",
      text: "#2a2436",
    },
  },

  // ── 默认深色还是浅色 ──────────────────────────────────────────
  // "dark" 或 "light"
  defaultMode: "dark",

  // ── 片段 ──────────────────────────────────────────────────────
  sections: [
    {
      type: "greeting",
      title: "嗨，",
      subtitle: "今天有几句话，想慢慢说给你听。",
    },
    {
      type: "announcement",
      text: "生日快乐呀 🎂",
    },
    {
      type: "chatbox",
      message:
        "生日快乐。今年也要好好吃饭、好好睡觉，被很多很多小事温柔地照顾到。",
      buttonText: "发送",
    },
    {
      type: "ideas",
      // 每行一句话；<strong> 里的字会高亮；最后一行会自动放大
      lines: [
        "想祝你新的一年，每天都睡得着。",
        "想祝你遇到的人都<strong>真诚</strong>，",
        "想祝你偶尔偷懒，也一点都不心虚。",
        "想祝你被很多人喜欢，",
        "更想祝你，喜欢自己。",
      ],
    },
    {
      type: "quote",
      text: "你不需要急着变成谁，慢慢长成自己最喜欢的样子就好。",
    },
    { type: "stars", count: 50 },
    { type: "balloons", count: 10 },
    { type: "fireworks", count: 14 },
    { type: "confetti", count: 6 },
    {
      type: "closing",
      text: "今天只要能笑一次，就很好啦。",
      replayText: "想再看一遍的话，点这里 →",
    },
    {
      type: "easteregg",
      label: "藏了一个小彩蛋",
    },
  ],
};
