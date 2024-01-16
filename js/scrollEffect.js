class ObserverCurrentSection {
  constructor() {
    this.callbacks = [];
    this.currentSection = "";
  }

  callCallbacks() {
    this.callbacks.forEach((callback) => callback(this.currentSection));
  }

  addCallback(callback) {
    this.callbacks.push(callback);
    return this;
  }

  setCurrentSectionValue(text) {
    this.currentSection = text;
    return this;
  }
}

class ScrollEffect {
  constructor() {
    this.lastScroll = 0;
    this.isMiniNavShown = false;
    this.curentSectionObserver = new ObserverCurrentSection();
    this.bindMethods();

    //call init before addCallbacksToObserve, because callbacks uses HTMLEleements selected in init()
    this.init();
    this.addNavClickHandler();
    this.addCallbacksToObserver();
    this.handleMouseoverHeader();
    this.applyIntersectionObserver();
    this.handleResize();
  }

  bindMethods() {
    this.showMini = this.showMini.bind(this);
    this.showNav = this.showNav.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
  }
  addCallbacksToObserver() {
    this.curentSectionObserver
      .addCallback((text) => (this.$miniNav.innerHTML = text))
      .addCallback((text) => (this.$currentSection.innerHTML = text));
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

    this.$currentSection = document.querySelector("#current-section");
  }

  addNavClickHandler() {
    if (this.isMobile)
      this.$nav.addEventListener("click", this.handleLinkClick);
    else this.$nav.removeEventListener("click", this.handleLinkClick);
  }

  handleLinkClick(e) {
    const target = e.target;
    if (target.tagName.toLowerCase() == "a") {
      document.querySelector("#header-input").click();
    }
  }

  handleMouseoverHeader() {
    this.$header.addEventListener("mouseover", () => {
      this.showNav();
    });
  }

  isMobile() {
    return window.getComputedStyle(this.$header).getPropertyValue("--isMobile");
  }
  showMini() {
    if (this.isMobile()) {
      this.isMiniNavShown = false;
      return;
    }

    this.isMiniNavShown = true;
    // this.$miniNav.textContent = text;
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
    // if (!this.isMiniNavShown) return;
    this.isMiniNavShown = false;

    if (this.$navWrapper.contains(this.$miniNav)) {
      this.$navWrapper.removeChild(this.$miniNav);
    }

    if (!this.$navWrapper.contains(this.$nav))
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
    this.curentSectionObserver
      .setCurrentSectionValue(elementsToWatch[0].id)
      .callCallbacks();

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

      const currentSection = target.id;

      this.curentSectionObserver
        .setCurrentSectionValue(currentSection)
        .callCallbacks();
      if (entry.intersectionRect.top > entry.boundingClientRect.top) return;

      if (this.isJustLoadPage) return (this.isJustLoadPage = false);

      this.showMini();
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
          this.showMini();
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
    let innerResizeTimer = null;
    window.addEventListener("resize", () => {
      this.$header.classList.add("hide");
      window.removeEventListener("scroll", this.handleScroll);

      clearTimeout(resizeTimer);
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        this.showNav();
        resizeTimer = setTimeout(() => {
          this.$header.classList.remove("hide");
        }, 400);
        window.addEventListener("scroll", this.handleScroll);
        //si mobile ? addEventtListener("click"..)
        this.addNavClickHandler();
        // }, 200);
      }, 300);
    });
  }
}

new ScrollEffect();
