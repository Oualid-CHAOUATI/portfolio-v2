console.log("intro");

window.addEventListener("load", () => {
  console.log("loaded");
  setTimeout(() => {
    const wrapper = document.querySelector(".welcome-overlay");
    wrapper.classList.add("fade");
  }, 500);
});
