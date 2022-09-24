// burger__menu
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__top-nav');
let menuLinks = menu.querySelectorAll('.header__top-link');
let accountLink = menu.querySelector('.account-link');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__top-nav--active');
  accountLink.classList.remove('focus-effect');
  if (burger.classList.contains('burger--active')) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.removeProperty("overflow");
  }
})

menuLinks.forEach(function (elem) {
  elem.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__top-nav--active');
    document.body.style.removeProperty("overflow");
  })
})


// search
function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search",
  closeBtnClass: "js-close-search",
  searchClass: "js-form",
  activeClass: "is-opened",
  hiddenClass: "is-closed"
});



// scroll
document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    });
  });
});


// header__bottom
const params = {
  btnClassName: "header__bottom-btn",
  dropClassName: "header__dropdown",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName},
    .${params.dropClassName}.${params.activeClassName}`
    );

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();


// hero__swiper
const swiper = new Swiper('.hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});


// gallery__choices
const element = document.querySelector('.choices');
const choices = new Choices(element, {
  searchEnabled: false
});


// gallery__swiper
document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".gallery__swiper", {
    slidesPerView: 1,
    spaceBetween: 20,

    grid: {
      rows: 1,
      fill: "row"
    },

    pagination: {
      el: ".gallery__pagination",
      type: "fraction"
    },

    navigation: {
      nextEl: ".gallery__btn-next",
      prevEl: ".gallery__btn-prev"
    },

    breakpoints: {
      577: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1201: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",
    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});


// modals
const btns = document.querySelectorAll('.gallery__slide');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');

    document.body.style.overflow = "hidden";
  });
});

closeBtns.forEach((elem) => {
  elem.addEventListener('click', function () {
    document.body.style.removeProperty("overflow");
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  });
})

modalOverlay.addEventListener('click', (e) => {
  document.body.style.removeProperty("overflow");

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});


// catalog__accordion
new Accordion('.accordion-container', {
  openOnInit: [0]
});


// catalog__tabs
document.querySelectorAll('.catalog__btn').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (elem) {
    const path = elem.currentTarget.dataset.path;
    document.querySelectorAll('.catalog__btn').forEach(function (btn) {
      btn.classList.remove('catalog__btn--active')
    });
    elem.currentTarget.classList.add('catalog__btn--active');
    document.querySelectorAll('.artist').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('artist--active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('artist--active');
  })
})


// events__swiper
document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".events__swiper", {
    slidesPerView: 1,
    spaceBetween: 20,

    grid: {
      rows: 1,
      fill: "row"
    },

    navigation: {
      nextEl: '.events__btn-next',
      prevEl: '.events__btn-prev',
    },

    pagination: {
      el: '.events__pagination',
      type: 'bullets',
    },

    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      993: {
        slidesPerView: 3,
        spaceBetween: 27
      },
      1201: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    }
  });
});


// tooltips
tippy('.tooltip', {
  theme: 'my-theme',
  trigger: 'click',
  maxWidth: 264,
  delay: 100,
});


// projects__swiper
document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".projects__swiper", {
    slidesPerView: 1,
    spaceBetween: 20,

    grid: {
      rows: 1,
      fill: "row"
    },

    navigation: {
      nextEl: '.projects__btn-next',
      prevEl: '.projects__btn-prev',
    },

    breakpoints: {
      577: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      993: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      1201: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",
    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});


// contacts__form
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);

const validation = new JustValidate(
  '.contacts__form',
  {

    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#D11616',
    },
  },
);

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Вы не ввели имя',
    },
  ])
  .addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'Вы не ввели телефон',
    },
    {
      validator: (name, value) => {
        const ph = selector.inputmask.unmaskedvalue();
        return Number(ph) && ph.length === 10;
      },
      errorMessage: 'Телефон слишком короткий',
    },
  ]);


// contacts__map
ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('#map');

  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "360px", right: "10px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "230px", right: "10px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/placemark.svg",
      iconImageSize: [20, 20],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}
