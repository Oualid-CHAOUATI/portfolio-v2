onload = () => {
  const cursor = document.querySelector("#custom-cursor");

  window.addEventListener("mousemove", function (e) {
    const { clientX: x, clientY: y } = e;

    this.document.body.style.setProperty("--x", x + "px");
    this.document.body.style.setProperty("--y", y + "px");
  });
  window.addEventListener("mousedown", (e) => {
    document.body.classList.add("scale");
  });
  window.addEventListener("mouseup", (e) => {
    document.body.classList.remove("scale");
  });

  window.addEventListener("mouseover", (e) => {
    document.body.classList.remove("leave");
  });
  window.addEventListener("mouseout", (e) => {
    document.body.classList.add("leave");
  });
};
