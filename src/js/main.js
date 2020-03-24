$(function () {

  var windowWidth = $(window).width();

  var promoSection = $(".js-promo");
  var $scrolldownTrigger = $('.scrolldown-trigger');
  var $aboutUsSection = $('.js-about-us');
  var $aboutUsPageSection = $('.js-about-us-page');
  var $servicesSection = $('.js-services');
  var $projectsSection = $('.js-projects');
  var $newsSection = $('#scroll-news');
  var $contactsSection = $('.js-contacts');
  var $innerPageHeader = $('.header--inner');
  var projectsSwiper;

  var $mobileNavTrigger = $('.mobile-nav-trigger');
  var mobileMenuIsVisible = false;
  var mobileMenuTimeline = new TimelineMax({paused: true});

  var phoneMaskInitialized = false;
  var callbackPopupTimeline = new TimelineMax({
    paused: true, onComplete: function () {
      if (!phoneMaskInitialized) {
        $(".js-phone-field").inputmask("8 (999) 999-99-99");
      }
      phoneMaskInitialized = true;
    }
  });
  var $callbackPopupTrigger = $('.js-callback-popup-trigger');
  var callbackPopupIsVisible = false;

  var controller = new ScrollMagic.Controller();

  var $partnersPage = $('.page-content-partners');

  // Инициализация всех слайдеров
  initSliders();

  // Анимация футера
  animateFooterOnScroll();

  if (isIE()) {
    $('body').addClass('ie');
  }
  // Запускаем анимацию на главной
  if (promoSection.length > 0 && !isIE()) {
    animatePromoSection();
    initPromoScrollScene();
  }

  // Анимация мышки на главной странице
  if ($scrolldownTrigger.length > 0) {
    animateScrolldownTrigger();
  }

  // Анимация секции "О нас" на главной
  if ($aboutUsSection.length > 0 && windowWidth >= 1000) {
    animateAboutSection();
  }

  // Анимация секции "Услуги" на главной
  if ($servicesSection.length > 0 && windowWidth >= 1000) {
    animateServicesSection();
  }

  // Анимация секции "О нас" на отдельной странице
  if ($aboutUsPageSection.length > 0 && windowWidth >= 1000) {
    animateAboutPageSection();
  }

  // Анимация секции "Проекты" на главной
  if ($projectsSection.length > 0 && windowWidth >= 1000) {
    animateProjectsSection();
  }

  // Анимация секции "Новости" на главной
  if ($newsSection.length > 0 && windowWidth >= 1000) {
    animateNewsSection();
  }

  // Анимация секции "Контакты" на главной
  if ($contactsSection.length > 0 && windowWidth >= 1000) {
    animateContactsSection();
  }


  // Инициализация скролла
  initScrollTo();

  // Инициализация слайдеров на странице "Партнеры"
  if ($partnersPage.length > 0) {
    initPartnerSliders();
  }

  // Вешаем обработчик на мобильное меню
  // И подготавливаем для него анимацию
  if ($mobileNavTrigger.length > 0) {

    mobileMenuTimeline
      .fromTo('.mobile-menu', 0.3, {xPercent: -100, display: 'none'}, {xPercent: 0, display: 'flex'})
      .staggerFromTo('.mobile-menu__nav a', 0.2, {y: 30, opacity: 0}, {y: 0, opacity: 1}, 0.1)
      .fromTo('.mobile-menu .social-icons', 0.2, {y: 30, opacity: 0}, {y: 0, opacity: 1});

    $mobileNavTrigger.on('click', onMobileNavTriggerClick);
  }

  // Вешаем обработчик на попап "Обратный звонок"
  // И подготавливаем для него анимацию
  if ($callbackPopupTrigger.length > 0) {

    callbackPopupTimeline
      .set(".popup-callback", {display: 'block'})
      .fromTo('.popup__overlay', 0.3, {xPercent: 100}, {xPercent: 0})
      .fromTo('.popup__skew', 0.3, {xPercent: 100}, {xPercent: 0}, "-=0.2")
      .staggerFromTo('.popup__title, .form-row', 0.3, {x: 30, opacity: 0}, {x: 0, opacity: 1}, 0.1);
    // .fromTo('.mobile-menu .social-icons', 0.2, {y: 30, opacity: 0}, {y: 0, opacity: 1});

    $callbackPopupTrigger.on('click', onCallbackPopupTriggerClick);
  }

  // Анимация лого на внутренних страницах
  if ($innerPageHeader.length > 0) {
    animateInnerPageLogo();
  }

  // Делаем анимацию линий на внутренних страницах
  if ($innerPageHeader.length > 0 && windowWidth >= 1000) {
    animateInnerPageLines();
  }

  function onMobileNavTriggerClick(e) {
    e.preventDefault();
    $(this).toggleClass('active');

    if (mobileMenuIsVisible) {
      mobileMenuTimeline.reverse();
      mobileMenuIsVisible = false;
    } else {
      mobileMenuTimeline.play();
      mobileMenuIsVisible = true;
    }
  }

  function onCallbackPopupTriggerClick(e) {
    e.preventDefault();

    if (callbackPopupIsVisible) {
      callbackPopupTimeline.reverse(null, true);
      callbackPopupIsVisible = false;
    } else {
      callbackPopupTimeline.play();
      callbackPopupIsVisible = true;
    }

    $('.js-callback-popup-close').on('click', onCallbackPopupTriggerClick);

    $('.popup__overlay').on('click', function () {
      callbackPopupTimeline.reverse(null, true);
      callbackPopupIsVisible = false;
    });

  }

  function animateScrolldownTrigger() {
    var tl = new TimelineMax({repeat: -1, repeatDelay: 3});

    // tl
    //   .to($scrolldownTrigger, 0.1, {y: "20"})
    //   .to($scrolldownTrigger, 0.05, {y: "0"}, "+=0.2")
    //   .to($scrolldownTrigger, 0.1, {y: "20"}, "+=0.2")
    //   .to($scrolldownTrigger, 0.05, {y: "0"}, "+=0.2");
    //

    $scrolldownTrigger.on('click', function (e) {
      e.preventDefault();
      TweenMax.to(window, 2, {scrollTo: '#scroll-about-us'});
    });
  }

  function animatePromoSection() {

    var tl = new TimelineMax();

    tl
    // .fromTo('.promo__logo', 2, {opacity: 0, y: 500}, {opacity: 1, y: 0})
      .fromTo('.promo__logo', 1, {opacity: 0}, {opacity: 1})
      .fromTo('#promo-logo-linear-gradient, #header-logo-linear-gradient',
        4,
        {attr: {gradientTransform: 'translate(-1,1)'}},
        {attr: {gradientTransform: 'translate(3,1)'}, repeat: -1, repeatDelay: 4}, '-=1')
      .fromTo('.header--primary', 0.3, {opacity: 0}, {opacity: 1}, '-=3')
      .fromTo('.promo__bottom', 0.3, {opacity: 0}, {opacity: 1}, '-=0.3');
  }

  function initPromoScrollScene() {

    var tl = new TimelineMax();

    tl.fromTo('.js-promo', 1, {opacity: 1}, {opacity: 0});

    var secondPromoScene = new ScrollMagic.Scene({
      triggerElement: '.about-us',
      triggerHook: 1,
      duration: '100%'
    })
      .setTween(tl)
      .addTo(controller);

    var promoScene = new ScrollMagic.Scene({
      triggerElement: '.js-promo-wrap',
      triggerHook: "onLeave",
      duration: '100%'
    })
      .setPin('.js-promo-wrap', {pushFollowers: false})
      .addTo(controller);

  }

  function animateAboutSection() {

    var tl = new TimelineMax();

    tl.staggerFromTo('#rect-blue-1, #rect-white-1, #rect-blue-2, #rect-blue-3, #rect-red-1', 1, {
      x: 100,
      opacity: 0
    }, {x: 0, opacity: 1}, 0.3)
      .staggerFromTo('.about-us__title, .about-us__subtitle, .about-us__button-wrap', 1, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.1, '-=1.5')
      .fromTo('.about-us__line', 1, {
        opacity: 0,
        height: 0,
      }, {height: 300, opacity: 1}, '-=0.2')
      // .fromTo('.about-us__fighters', 1, {
      //   y: 100,
      // }, {y: 0})
      .staggerFromTo('.about-us .map-marker', 1, {
        opacity: 0,
        y: 50,
      }, {y: 0, opacity: 1}, 0.2, '-=1')
      .fromTo('.about-us .map-text', 1, {
        opacity: 0,
        x: 100,
      }, {x: 0, opacity: 1}, '-=2');

    var aboutScene = new ScrollMagic.Scene({
      triggerElement: '.js-about-us',
      triggerHook: 1,
      duration: '160%'
    })
      .setTween(tl)
      .addTo(controller);

    // Анимация ракеты
    var rocketTimeline = new TimelineMax();
    var containerWidth = 1170;

    var diff = windowWidth - containerWidth;

    rocketTimeline.fromTo('.js-rocket-progress', 2, {xPercent: -100}, {x: containerWidth + (diff / 2) + 90});

    var secondPromoScene = new ScrollMagic.Scene({
      triggerElement: '#scroll-services',
      triggerHook: 1,
      duration: 0,
    })
      .setTween(rocketTimeline)
      .addTo(controller);
  }


  function animateServicesSection() {

    var tl = new TimelineMax();

    tl
      .staggerFromTo('.services__title-word, .services__title-text', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.2)
      .staggerFromTo('#rect-services-blue-1,#rect-services-blue-2,#rect-services-blue-3', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.1, "-=0.1")
      .fromTo('.services-steps__col--1', 0.3, {
        x: -100,
        opacity: 0
      }, {x: 0, opacity: 1})
      .fromTo('.services-steps__col--2', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1});

    var aboutScene = new ScrollMagic.Scene({
      triggerElement: '.js-services',
      triggerHook: 0.6,
      duration: 0
    })
      .setTween(tl)
      .addTo(controller);
  }

  function animateProjectsSection() {

    var tl = new TimelineMax({
      onComplete: function () {
        projectsSwiper.autoplay.start();
        projectsSwiper.autoplay.disableOnInteraction = false;
      }
    });

    tl
      .fromTo('#projects', 0.6, {opacity: 0}, {opacity: 1})
      .staggerFromTo('.projects__title-word, .projects__title-text', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.3)
      .staggerFromTo('#rect-blue-projects-1, #rect-white-projects-1, #rect-red-projects-1, #rect-blue-projects-2, #rect-red-projects-2, #rect-white-projects-2, #rect-news-blue-1', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.1)
      .fromTo('.projects-slider', 0.3, {opacity: 0}, {opacity: 1})
      .fromTo('.projects-navigation', 0.3, {opacity: 0}, {opacity: 1});

    var projects = new ScrollMagic.Scene({
      triggerElement: '#projects',
      triggerHook: 0.6,
      duration: 0,
      reverse: false,
    })
      .setTween(tl)
      .addTo(controller);
  }

  function animateNewsSection() {

    var tl = new TimelineMax();

    tl
      .staggerFromTo('.news__title-word, .news__title-text, .news__button-wrap', 0.3, {
        x: 100,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.2)
      .staggerFromTo('.news .swiper-slide-visible', 0.3, {
        opacity: 0
      }, {opacity: 1}, 0.1);

    var news = new ScrollMagic.Scene({
      triggerElement: '#scroll-news',
      triggerHook: 0.8,
      duration: 0,
      reverse: false,
    })
      .setTween(tl)
      .addTo(controller);
  }

  function animateContactsSection() {

    var tl = new TimelineMax();

    tl
      .staggerFromTo('#rect-contacts-white-1, #rect-footer-red-1, #rect-footer-blue-1, #rect-footer-white-1', 0.3, {
        x: 30,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.2)
      .fromTo('.contacts__line', 0.3, {
        height: 0,
        opacity: 0
      }, {height: 212, opacity: 1})
      .fromTo('.contacts__top .section-title', 0.3, {
        x: 30,
        opacity: 0
      }, {x: 0, opacity: 1}, "-=0.1")
      .staggerFromTo('.contacts__list li', 0.3, {
        x: 30,
        opacity: 0
      }, {x: 0, opacity: 1}, 0.1)
      .fromTo('.contact-callback', 0.3, {
        opacity: 0
      }, {opacity: 1});

    var contacts = new ScrollMagic.Scene({
      triggerElement: '.js-contacts',
      triggerHook: 0.7,
      duration: 0,
      reverse: false,
    })
      .setTween(tl)
      .addTo(controller);
  }

  function animateAboutPageSection() {

    var tl = new TimelineMax();

    tl.fromTo('.js-rocket-progress-about-us-page', 2, {xPercent: 100}, {xPercent: 0});

    var secondPromoScene = new ScrollMagic.Scene({
      triggerElement: '.page-about-us-text',
      triggerHook: 1,
      duration: 0
    })
      .setTween(tl)
      .addTo(controller);
  }

  function initSliders() {

    // Слайдер проектов
    projectsSwiper = new Swiper('.projects-slider', {
      spaceBetween: 200,
      speed: 600,
      // loop: true,
      // loopAdditionalSlides: true,
      watchSlidesVisibility: true,
      breakpoints: {
        1000: {
          autoplay: {
            delay: 5000,
          }
        }
      },
      // loop: true,
      navigation: {
        prevEl: '.projects-navigation__arrow--prev',
        nextEl: '.projects-navigation__arrow--next'
      }
    });

    // Слайдер новостей
    var newsSwiper = new Swiper('.news-slider', {
      spaceBetween: 1,
      slidesPerView: 4,
      watchSlidesVisibility: true,
      loop: true,
      breakpoints: {
        310: {
          spaceBetween: 1,
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 4,
        }
      },
    });
  }

  function animateFooterOnScroll() {
    var tl = new TimelineMax();

    tl.fromTo('.js-rocket-progress-footer', 1, {xPercent: -100}, {xPercent: 0});

    var secondPromoScene = new ScrollMagic.Scene({
      triggerElement: '.footer',
      triggerHook: 1,
      duration: 0,
    })
      .setTween(tl)
      .addTo(controller);
  }

  function initScrollTo() {
    $("[href^='#scroll']").on('click', function (e) {
      e.preventDefault();
      var sectionToScroll = $(this).attr('href');
      console.log(sectionToScroll);
      TweenMax.to(window, 2, {scrollTo: sectionToScroll});
    });
  }

  function initPartnerSliders() {
    var promotersSwiper = new Swiper('.promoters-slider', {
      slidesPerView: 1,
      watchOverflow: true,
      watchSlidesVisibility: true,
      autoplay: true,
      navigation: {
        prevEl: '.partners--promoters .slider-arrow--prev',
        nextEl: '.partners--promoters .slider-arrow--next',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1000: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          slidesPerColumnFill: 'row',
          spaceBetween: 30,
        },
        1170: {
          slidesPerView: 4,
          slidesPerColumn: 2,
          slidesPerColumnFill: 'row',
          spaceBetween: 30,
        },
      },
    });

    var commercialSwiper = new Swiper('.commercial-slider', {
      slidesPerView: 1,
      watchOverflow: true,
      watchSlidesVisibility: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        prevEl: '.partners--commercial .slider-arrow--prev',
        nextEl: '.partners--commercial .slider-arrow--next',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1170: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    var infoPartnersSlider = new Swiper('.info-partners-slider', {
      slidesPerView: 1,
      watchOverflow: true,
      watchSlidesVisibility: true,
      speed: 800,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: '.partners--info .slider-arrow--prev',
        nextEl: '.partners--info .slider-arrow--next',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1170: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  function animateInnerPageLogo() {
    var tl = new TimelineMax();

    tl
      .fromTo('#header-logo-linear-gradient',
        4,
        {attr: {gradientTransform: 'translate(-1,1)'}},
        {attr: {gradientTransform: 'translate(3,1)'}, repeat: -1, repeatDelay: 4, delay: 2}, '-=1');
  }

  function animateInnerPageLines() {
    var tl = new TimelineMax({ repeat: -1 });

    var $rects = $('.rect');

    if ($rects.length > 0) {
      TweenMax.fromTo(".page-content .rect:not(.rect-red)", 2, {backgroundImage: "linear-gradient(135deg, #0375e7, #022a8a)"}, {backgroundImage: "linear-gradient(135deg, #022a8a, #0375e7)", repeat: -1, yoyo: true});
      TweenMax.fromTo(".page-content .rect-red", 2, {backgroundImage: "linear-gradient(135deg, #d21300, #f8171f)"}, {backgroundImage: "linear-gradient(135deg, #f8171f, #d21300)", repeat: -1, yoyo: true});
    }

  }

  function isIE() {
    if (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
      return true;
    } else {
      return false;
    }
  }

});
