onload = () => {
  const OFFSET = 10;
  let lastPos = { x: 0, y: 0 };
  window.addEventListener("mousemove", function (e) {
    // debugger;
    const { clientX: x, clientY: y } = e;

    const distance = Math.sqrt(
      Math.pow(x - lastPos.x, 2) + Math.pow(y - lastPos.y, 2)
    );
    if (distance > OFFSET) {
      const div = document.createElement("div");
      div.classList.add("cursor-dot");
      div.style.setProperty("--x", x + "px");
      div.style.setProperty("--y", y + "px");
      this.document.body.appendChild(div);
      lastPos = { x, y };

      this.setTimeout(() => {
        div.remove();
      }, 2000);
    }
  });
};
