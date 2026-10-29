(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-closing";
      div.innerHTML = `
        <p class="closing-text">${
          section.text || "Okay, now come back and tell me if you liked it."
        }</p>
        <p class="replay-btn" id="replay">${
          section.replayText || "Or click, if you want to watch it again."
        }</p>
        <p class="last-smile">:)</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const from = { opacity: 0, y: -20 };
      const to = { opacity: 1, y: 0, duration: 1, ease: "power2.out" };

      tl.fromTo(el.querySelector(".closing-text"), from, { ...to }, 0)
        .fromTo(el.querySelector("#replay"), from, { ...to }, 1.2)
        .fromTo(el.querySelector(".last-smile"), from, { ...to }, 2.4)
        // 三段都出现之后，重播按钮才可以点
        .set(el.querySelector("#replay"), { pointerEvents: "auto" })
        .to(el.querySelector(".last-smile"), {
          duration: 0.5, rotation: 90,
        }, "+=1");
    },
  };
})();
