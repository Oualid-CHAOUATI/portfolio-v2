const header = document.querySelector("header");
header.addEventListener("mouseover", () => {
  console.log("mouseover on header");
  showNav();
});
const miniNav = document.querySelector(".mini-nav");
const nav = document.querySelector(".nav");
const navWrapper = document.querySelector(".nav-wrapper");

function showMini(text) {
  miniNav.textContent = text;
  nav.classList.add("hide");
  navWrapper.style.width = miniNav.offsetWidth + "px";
  navWrapper.style.height = miniNav.offsetHeight + "px";
  setTimeout(() => {
    miniNav.classList.remove("hide");
    nav.classList.add("hide");
  }, 300);
}

function showNav() {
  navWrapper.style.width = navWrapper.scrollWidth + "px";
  navWrapper.style.height = nav.offsetHeight + "px";
  miniNav.classList.add("hide");
  setTimeout(() => {
    nav.classList.remove("hide");
    miniNav.classList.add("hide");
  }, 300);
}
let lastScroll = 0;
let isShowMini = false;

function handleScroll(e) {
  const offset = 30;
  const scroll = document.documentElement.scrollTop;
  const scrollDiff = scroll - lastScroll;
  const isScrollingDown = scrollDiff >= 0;

  if (isScrollingDown) {
    if (Math.abs(scrollDiff) > offset) {
      lastScroll = scroll;

      if (!isShowMini) {
        showMini(currectSection);
        isShowMini = true;
      }
    }
  } else {
    if (Math.abs(scrollDiff) > offset) {
      lastScroll = scroll;
      if (isShowMini) {
        showNav();
        isShowMini = false;
      }
    }
  }
}
function scrollSectionEfffect() {
  //pour empecher que la mini nav s'affiche
  let isJustLoadPage = true;

  const elementsToWatch = document.querySelectorAll("section");
  let currectSection = elementsToWatch[0].id;
  //pour avoir une largeur fixed et permettre la transition
  showNav();

  //---------------

  addEventListener("scroll", handleScroll);

  const observer = new IntersectionObserver(intersectionObserverCallback, {
    rootMargin: "-100px 0% -100px 0%",
  });
  elementsToWatch.forEach((element) => observer.observe(element));

  function intersectionObserverCallback(entries) {
    entries.forEach((entry) => {
      const isIntersecting = entry.isIntersecting;
      const target = entry.target;

      if (!isIntersecting) return;
      currectSection = target.id;
      //si le défilement est vers le Haut on fait rien
      if (entry.intersectionRect.top > entry.boundingClientRect.top) return;
      if (isJustLoadPage) return (isJustLoadPage = false);
      showMini(currectSection);
      isShowMini = true;
    });
  }
}

scrollSectionEfffect();
let resizeTimer = null;
window.addEventListener("resize", (e) => {
  navWrapper.style.width = null;
  header.classList.add("hide");
  window.removeEventListener("scroll", handleScroll);
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    header.classList.remove("hide");

    setTimeout(() => {
      showNav();
      window.addEventListener("scroll", handleScroll);
    }, 600);
  }, 300);
});
