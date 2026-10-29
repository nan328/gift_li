/**
 * 彩蛋：一段没有提交运行结果的 C++ 代码。
 *
 * 想改里面的诗或代码，直接改下面 CODE 里的内容即可——
 * 面板里的「诗」是从这段代码开头的大段注释里自动读出来的，
 * 所以改一处，两边都会跟着变。
 */
(function () {
  window.Components = window.Components || {};

  const CODE = String.raw`#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <windows.h>
#include <thread>
#include <chrono>

using namespace std;

/*
 * 《未命名变量》
 *
 * 我一直觉得，
 * 世界是可以被理解的。
 *
 * 一切都有迹可循，
 * 万物有自己的规律，
 * 复杂的问题可以拆解，
 * 漫长的过程终有答案。
 *
 * 直到我试着描述一个人。
 *
 * 她有很好的记性，
 * 许多细碎的事情，
 * 都能在她那里找到来处。
 *
 * 那些偶尔的争论，
 * 那些没能说清的话，
 * 也会在下一次对话里，
 * 留下新的注脚。
 *
 * 我偶尔也会试图辩解，
 * 为自己的逻辑寻找依据。
 * 但有些事情，
 * 似乎并不需要争出胜负。
 *
 * 比如她笑起来的时候，
 * 连寻常的日子都显得明亮。
 * 像阳光经过某种恰好的折射，
 * 落在原本平平无奇的地方。
 *
 * 她有自己的方向，
 * 自己的判断，
 * 也有足够的能力
 * 去抵达想去的远方。
 *
 * 我不打算给她定义。
 * 变量应该保留变化的自由，
 * 而人本来就比任何模型复杂。
 *
 * 只是偶尔，
 * 当我遍历过许多风景，
 * 读过许多故事，
 * 又为某个问题想了很久，
 *
 * 会发现有些东西
 * 并不需要被解释。
 *
 * 就像一段没有写进注释的代码，
 * 它安静地运行着。
 *
 * 不报错，
 * 不求证，
 * 也没有打算
 * 向谁提交运行结果。
 */

const int ROWS = 15;
const int COLS = 31;

vector<string> maze;
bool visited[ROWS][COLS] = {};
bool onPath[ROWS][COLS] = {};
pair<int, int> parentCell[ROWS][COLS];

int startR = 1, startC = 1;
int endR = 13, endC = 29;

// 生成地图
void buildMaze() {
    maze.assign(ROWS, string(COLS, '.'));

    // 四周设置为墙壁
    for (int r = 0; r < ROWS; ++r) {
        maze[r][0] = '#';
        maze[r][COLS - 1] = '#';
    }

    for (int c = 0; c < COLS; ++c) {
        maze[0][c] = '#';
        maze[ROWS - 1][c] = '#';
    }

    // 设置纵向障碍，每道墙留一个通道
    for (int c = 4, wall = 0; c < COLS - 2;
         c += 4, ++wall) {

        int gap = (wall % 2 == 0) ? 3 : 11;

        for (int r = 1; r < ROWS - 1; ++r) {
            if (r != gap) {
                maze[r][c] = '#';
            }
        }
    }

    maze[startR][startC] = 'S';
    maze[endR][endC] = 'E';
}

// 设置文字颜色
void setColor(int color) {
    SetConsoleTextAttribute(
        GetStdHandle(STD_OUTPUT_HANDLE), color
    );
}

// 绘制当前地图
void drawMaze(int curR = -1, int curC = -1) {
    system("cls");

    cout << "========== WORLD EXPLORER ==========\n";
    cout << "Algorithm: BFS\n\n";

    for (int r = 0; r < ROWS; ++r) {
        for (int c = 0; c < COLS; ++c) {
            if (r == curR && c == curC) {
                setColor(14);
                cout << '@';
            } else if (onPath[r][c]) {
                setColor(14);
                cout << '*';
            } else if (maze[r][c] == 'S') {
                setColor(10);
                cout << 'S';
            } else if (maze[r][c] == 'E') {
                setColor(12);
                cout << 'E';
            } else if (maze[r][c] == '#') {
                setColor(8);
                cout << '#';
            } else if (visited[r][c]) {
                setColor(11);
                cout << '+';
            } else {
                setColor(7);
                cout << ' ';
            }
        }
        cout << '\n';
    }

    setColor(7);
    cout << "\n# Wall  + Explored  * Shortest path\n";
    cout << "S Start @ Current position E Exit\n";
}

// 判断坐标是否在地图内
bool inside(int r, int c) {
    return r >= 0 && r < ROWS &&
           c >= 0 && c < COLS;
}

int main() {
    buildMaze();

    // BFS：从起点开始逐层探索
    queue<pair<int, int> > q;

    q.push(make_pair(startR, startC));
    visited[startR][startC] = true;
    parentCell[startR][startC] = make_pair(-1, -1);

    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};

    int exploredCount = 0;
    bool found = false;

    while (!q.empty()) {
        pair<int, int> cur = q.front();
        q.pop();

        int r = cur.first;
        int c = cur.second;

        ++exploredCount;

        drawMaze(r, c);
        cout << "\nExplored nodes: "
             << exploredCount << '\n';

        this_thread::sleep_for(
            chrono::milliseconds(70)
        );

        if (r == endR && c == endC) {
            found = true;
            break;
        }

        // 尝试上下左右四个方向
        for (int d = 0; d < 4; ++d) {
            int nr = r + dr[d];
            int nc = c + dc[d];

            if (!inside(nr, nc)) continue;
            if (maze[nr][nc] == '#') continue;
            if (visited[nr][nc]) continue;

            visited[nr][nc] = true;

            parentCell[nr][nc] =
                make_pair(r, c);

            q.push(make_pair(nr, nc));
        }
    }

    int pathLength = 0;

    // 从终点沿前驱节点倒推，恢复最短路径
    if (found) {
        int r = endR;
        int c = endC;

        while (!(r == startR && c == startC)) {
            onPath[r][c] = true;
            ++pathLength;

            pair<int, int> p = parentCell[r][c];

            r = p.first;
            c = p.second;
        }

        drawMaze();

        cout << "\nShortest path found!\n";
        cout << "Explored nodes: "
             << exploredCount << '\n';
        cout << "Path length: "
             << pathLength << " steps\n";
    } else {
        drawMaze();
        cout << "\nNo path found.\n";
    }

    cout << "\nPress Enter to exit...";
    cin.get();

    return 0;
}
`;

  // ── 极简 C++ 高亮 ───────────────────────────────────────────────
  const KEYWORDS = new Set([
    "using", "namespace", "const", "int", "bool", "void", "for", "while",
    "if", "else", "return", "break", "continue", "true", "false", "char",
    "double", "float", "long", "short", "unsigned", "static", "class",
    "struct", "new", "delete", "public", "private", "auto", "vector",
    "queue", "string", "pair", "this_thread", "chrono", "system",
  ]);

  function tokenize(src) {
    const tokens = [];

    function push(text, type) {
      if (!text) return;
      const last = tokens[tokens.length - 1];
      if (last && last.type === type) last.text += text;
      else tokens.push({ text, type });
    }

    let i = 0;
    while (i < src.length) {
      const ch = src[i];
      const pair2 = src.slice(i, i + 2);

      if (pair2 === "//") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? src.length : end;
        push(src.slice(i, stop), "comment");
        i = stop;
        continue;
      }

      if (pair2 === "/*") {
        const end = src.indexOf("*/", i + 2);
        const stop = end === -1 ? src.length : end + 2;
        push(src.slice(i, stop), "comment");
        i = stop;
        continue;
      }

      if (ch === '"' || ch === "'") {
        let j = i + 1;
        while (j < src.length && src[j] !== ch) {
          if (src[j] === "\\") j++;
          j++;
        }
        push(src.slice(i, j + 1), "string");
        i = j + 1;
        continue;
      }

      if (ch === "#") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? src.length : end;
        push(src.slice(i, stop), "pre");
        i = stop;
        continue;
      }

      if (/[A-Za-z_]/.test(ch)) {
        let j = i + 1;
        while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
        const word = src.slice(i, j);
        push(word, KEYWORDS.has(word) ? "kw" : "plain");
        i = j;
        continue;
      }

      if (/[0-9]/.test(ch)) {
        let j = i + 1;
        while (j < src.length && /[0-9.]/.test(src[j])) j++;
        push(src.slice(i, j), "num");
        i = j;
        continue;
      }

      push(ch, "plain");
      i++;
    }

    return tokens;
  }

  // 代码开头那段注释，就是那首诗
  function poemLines(src) {
    const m = src.match(/\/\*([\s\S]*?)\*\//);
    if (!m) return [];

    const lines = m[1].split("\n").map((line) =>
      line.replace(/^\s*\*?[ ]?/, "").replace(/\s+$/, "")
    );

    while (lines.length && !lines[0]) lines.shift();
    while (lines.length && !lines[lines.length - 1]) lines.pop();

    return lines;
  }

  // ── 面板（只在第一次点开时创建） ────────────────────────────────
  let modal = null;

  function buildPoem(el) {
    const lines = poemLines(CODE);
    el.innerHTML = "";

    lines.forEach((line, i) => {
      const p = document.createElement("p");
      if (!line) {
        p.className = "is-gap";
      } else {
        if (i === 0) p.className = "is-title";
        p.textContent = line;
        p.dataset.delay = Math.min(i * 0.04, 1.2) + "s";
        p.style.animationDelay = p.dataset.delay;
      }
      el.appendChild(p);
    });
  }

  function buildCode(box) {
    const gutter = box.querySelector(".egg-gutter");
    const pre = box.querySelector(".egg-code");

    gutter.textContent = CODE.split("\n")
      .map((_, i) => i + 1)
      .join("\n");

    pre.innerHTML = "";
    tokenize(CODE).forEach((t) => {
      if (t.type === "plain") {
        pre.appendChild(document.createTextNode(t.text));
      } else {
        const span = document.createElement("span");
        span.className = "tok-" + t.type;
        span.textContent = t.text;
        pre.appendChild(span);
      }
    });
  }

  function ensureModal(name) {
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "egg-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "彩蛋：未命名变量");
    modal.innerHTML = `
      <div class="egg-backdrop" data-close></div>
      <div class="egg-panel">
        <button class="egg-close" type="button" aria-label="关闭彩蛋">✕</button>
        <p class="egg-kicker">彩蛋 · 写给 <span class="egg-who"></span></p>
        <h2 class="egg-title">未命名变量</h2>
        <p class="egg-sub">一段没有提交运行结果的代码</p>
        <div class="egg-tabs" role="tablist">
          <button type="button" role="tab" class="egg-tab is-on" data-view="poem">诗</button>
          <button type="button" role="tab" class="egg-tab" data-view="code">代码</button>
        </div>
        <div class="egg-body">
          <div class="egg-poem" data-view-panel="poem"></div>
          <div class="egg-codebox" data-view-panel="code" hidden>
            <pre class="egg-gutter" aria-hidden="true"></pre>
            <pre class="egg-code"></pre>
          </div>
        </div>
        <p class="egg-foot">按 Esc 关闭 · 也可以点一下空白处</p>
      </div>
    `;

    modal.querySelector(".egg-who").textContent = name || "你";
    document.body.appendChild(modal);

    buildPoem(modal.querySelector(".egg-poem"));
    buildCode(modal.querySelector(".egg-codebox"));

    const tabs = modal.querySelectorAll(".egg-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.toggle("is-on", t === tab));
        modal.querySelectorAll("[data-view-panel]").forEach((panel) => {
          panel.hidden = panel.dataset.viewPanel !== tab.dataset.view;
        });
      });
    });

    modal.querySelector(".egg-close").addEventListener("click", closeModal);
    modal.querySelector(".egg-backdrop").addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    return modal;
  }

  let lastFocus = null;

  function openModal(name) {
    const m = ensureModal(name);
    lastFocus = document.activeElement;

    m.hidden = false;
    // 重新触发一次逐行出现
    m.querySelector(".egg-poem").querySelectorAll("p").forEach((p) => {
      if (p.className === "is-gap") return;
      p.style.animation = "none";
      void p.offsetWidth;
      p.style.animation = "";
      p.style.animationDelay = p.dataset.delay || "0s";
    });

    requestAnimationFrame(() => m.classList.add("is-open"));
    m.querySelector(".egg-close").focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    setTimeout(() => {
      modal.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, 260);
  }

  // ── 组件 ────────────────────────────────────────────────────────
  window.Components.easteregg = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-egg";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "egg-trigger";
      btn.setAttribute("aria-haspopup", "dialog");
      btn.innerHTML = `<span class="egg-trigger__dot" aria-hidden="true"></span>${
        section.label || "藏了一个小彩蛋"
      }`;

      btn.addEventListener("click", () => openModal(config && config.name));
      div.appendChild(btn);

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const btn = el.querySelector(".egg-trigger");
      tl.fromTo(
        btn,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    },
  };
})();
