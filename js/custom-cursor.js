onload = () => {
  const $dotsWrapper = document.createElement("div");
  $dotsWrapper.id = "dots-wrapper";
  document.body.appendChild($dotsWrapper);

  const OFFSET = 40;
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

      $dotsWrapper.appendChild(div);
      lastPos = { x, y };

      this.setTimeout(() => {
        div.remove();
      }, 2000);
    }
  });
};
