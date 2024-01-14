class ScrollEffect {
  constructor() {
    this.lastScroll = 0;
    this.isMiniNavShown = false;
    this.currentSection;
    this.bindMethods();
    this.init();
    this.handleMouseoverHeader();
    this.applyIntersectionObserver();
    this.handleResize();
  }

  bindMethods() {
    this.showMini = this.showMini.bind(this);
    this.showNav = this.showNav.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    this.$header = document.querySelector("header");
    const $miniNavOriginal = document.querySelector(".mini-nav");
    this.$miniNav = $miniNavOriginal.cloneNode(true);
    $miniNavOriginal.remove();
    const $navOriginal = document.querySelector(".nav");
    this.$nav = $navOriginal.cloneNode(true);
    $navOriginal.remove();

    this.$navWrapper = document.querySelector(".nav-wrapper");
    this.$navWrapper.append(this.$nav);
  }

  handleMouseoverHeader() {
    this.$header.addEventListener("mouseover", () => {
      this.showNav();
    });
  }

  showMini(text) {
    const $currentSection = document.querySelector("#current-section");
    $currentSection.innerHTML = text;

    const isMobile = window
      .getComputedStyle(this.$header)
      .getPropertyValue("--isMobile");

    if (isMobile) {
      this.isMiniNavShown = false;
      return;
    }

    this.isMiniNavShown = true;
    this.$miniNav.textContent = text;
    this.$nav.classList.add("hide");

    if (this.$navWrapper.contains(this.$nav)) {
      this.$navWrapper.removeChild(this.$nav);
    }

    this.$navWrapper.appendChild(this.$miniNav);

    this.$navWrapper.style.setProperty(
      "--width",
      this.$miniNav.offsetWidth + "px"
    );

    setTimeout(() => {
      this.$miniNav.classList.remove("hide");
    }, 300);
  }

  showNav() {
    // debugger;
    if (!this.isMiniNavShown) return;
    this.isMiniNavShown = false;

    if (this.$navWrapper.contains(this.$miniNav)) {
      this.$navWrapper.removeChild(this.$miniNav);
    }

    this.$navWrapper.appendChild(this.$nav);
    this.$miniNav.classList.add("hide");
    this.$navWrapper.style.setProperty(
      "--width",
      this.$nav.children[0].offsetWidth + "px"
    );

    setTimeout(() => {
      this.$nav.classList.remove("hide");
    }, 300);
  }

  applyIntersectionObserver() {
    const elementsToWatch = document.querySelectorAll("section");
    this.currentSection = elementsToWatch[0].id;
    this.showNav();
    this.isJustLoadPage = true;

    addEventListener("scroll", this.handleScroll);

    const observer = new IntersectionObserver(
      this.intersectionObserverCallback.bind(this), // bind the callback to the instance
      {
        rootMargin: "-100px 0% -100px 0%",
      }
    );

    elementsToWatch.forEach((element) => observer.observe(element));
  }

  intersectionObserverCallback(entries) {
    entries.forEach((entry) => {
      const isIntersecting = entry.isIntersecting;
      const target = entry.target;

      if (!isIntersecting) return;

      this.currentSection = target.id;

      if (entry.intersectionRect.top > entry.boundingClientRect.top) return;

      if (this.isJustLoadPage) return (this.isJustLoadPage = false);

      this.showMini(this.currentSection);
    });
  }

  handleScroll(e) {
    const offset = 30;
    const scroll = document.documentElement.scrollTop;
    const scrollDiff = scroll - (this.lastScroll | 0);
    const isScrollingDown = scrollDiff >= 0;
    if (isScrollingDown) {
      if (Math.abs(scrollDiff) > offset) {
        this.lastScroll = scroll;

        if (!this.isMiniNavShown) {
          this.showMini(this.currentSection);
        }
      }
    } else {
      if (Math.abs(scrollDiff) > offset) {
        this.lastScroll = scroll;

        if (this.isMiniNavShown) {
          this.showNav();
        }
      }
    }
  }

  /**
   * this will show the nav if it's nt already shown (checking in showNav if mmini is shown)
   */
  handleResize() {
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      this.$header.classList.add("hide");
      window.removeEventListener("scroll", this.handleScroll);

      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        this.$header.classList.remove("hide");

        setTimeout(() => {
          this.showNav();
          window.addEventListener("scroll", this.handleScroll);
        }, 600);
      }, 300);
    });
  }
}

new ScrollEffect();
