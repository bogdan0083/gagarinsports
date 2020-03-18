$(function () {

  var promoSection = $(".js-promo");
  var $scrolldownTrigger = $('.scrolldown-trigger');
  var $aboutUsSection = $('.js-about-us');
  var $aboutUsPageSection = $('.js-about-us-page');

  var $mobileNavTrigger = $('.mobile-nav-trigger');
  var mobileMenuIsVisible = false;
  var mobileMenuTimeline = new TimelineMax({paused: true});

  var callbackPopupTimeline = new TimelineMax({paused: true});
  var $callbackPopupTrigger = $('.js-callback-popup-trigger');
  var callbackPopupIsVisible = false;

  var controller = new ScrollMagic.Controller();

  var $partnersPage = $('.page-content-partners');

  // Инициализация всех слайдеров
  initSliders();

  // Анимация футера
  animateFooterOnScroll();

  // Запускаем анимацию на главной
  if (promoSection.length > 0) {
    animatePromoSection();
    initPromoScrollScene();
  }

  // Анимация мышки на главной странице
  if ($scrolldownTrigger.length > 0) {
    animateScrolldownTrigger();
  }

  // Анимация секции "О нас" на главной
  if ($aboutUsSection.length > 0) {
    animateAboutSection();
  }

  // Анимация секции "О нас" на отдельной странице
  if ($aboutUsPageSection.length > 0) {
    animateAboutPageSection();
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
      .set(".popup-callback", { display: 'block'})
      .fromTo('.popup__overlay', 0.3, {xPercent: 100}, {xPercent: 0})
      .fromTo('.popup__skew', 0.3, {xPercent: 100}, {xPercent: 0}, "-=0.2")
      .staggerFromTo('.popup__title, .form-row', 0.3, {x: 30, opacity: 0}, {x: 0, opacity: 1}, 0.1);
      // .fromTo('.mobile-menu .social-icons', 0.2, {y: 30, opacity: 0}, {y: 0, opacity: 1});

    $callbackPopupTrigger.on('click', onCallbackPopupTriggerClick);
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
    $('.popup__overlay').on('click', function() {
      callbackPopupTimeline.reverse(null, true);
      callbackPopupIsVisible = false;
    });

  }
  function animateScrolldownTrigger() {
    var tl = new TimelineMax({repeat: -1, repeatDelay: 3});

    tl
      .to($scrolldownTrigger, 0.1, {y: "20"})
      .to($scrolldownTrigger, 0.05, {y: "0"}, "+=0.2")
      .to($scrolldownTrigger, 0.1, {y: "20"}, "+=0.2")
      .to($scrolldownTrigger, 0.05, {y: "0"}, "+=0.2");

    $scrolldownTrigger.on('click', function (e) {
      e.preventDefault();
    });
  }

  function animatePromoSection() {

    var tl = new TimelineMax();

    tl
      .staggerFromTo('#promo-logo-group path', 1, {opacity: 0, scale: 0.7}, {opacity: 1, scale: 1}, 0.1)
      .fromTo('#promo-logo-linear-gradient, #header-logo-linear-gradient',
        4,
        {attr: {gradientTransform: 'translate(-1,1)'}},
        {attr: {gradientTransform: 'translate(3,1)'}, repeat: -1, repeatDelay: 4}, '-=1')
      .fromTo('.header--primary', 0.3, {opacity: 0}, {opacity: 1}, '-=3')
      .fromTo('.promo__bottom', 0.3, {opacity: 0}, {opacity: 1}, '-=3');

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

    tl.fromTo('.js-rocket-progress', 1, {xPercent: -100}, {xPercent: 0});

    var secondPromoScene = new ScrollMagic.Scene({
      triggerElement: '#services',
      triggerHook: 1,
      duration: '100%'
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
    var projectsSwiper = new Swiper('.projects-slider', {
      spaceBetween: 200,
      // loop: true,
      navigation: {
        prevEl: '.projects-navigation__arrow--prev',
        nextEl: '.projects-navigation__arrow--next'
      }
    });

    // Слайдер новостей
    var newsSwiper = new Swiper('.news-slider', {
      spaceBetween: 1,
      slidesPerView: 3,
      loop: true,
      breakpoints: {
        310: {
          spaceBetween: 1,
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
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
      duration: $('.footer').height()
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
      autoplay: true,
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
      autoplay: true,
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
});
