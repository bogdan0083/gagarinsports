$(function () {

  var promoSection = $(".js-promo");
  var $mobileNavTrigger = $('.mobile-nav-trigger');
  var mobileMenuIsVisible = false;
  var mobileMenuTimeline = new TimelineMax({paused: true});
  var $scrolldownTrigger = $('.scrolldown-trigger');
  var $aboutUsSection = $('#about-us');
  var controller = new ScrollMagic.Controller();


  if (promoSection.length > 0) { // Запускаем анимацию на главной
    animatePromoSection();
    initPromoScrollScene();
  }

  if ($scrolldownTrigger.length > 0) { // Анимация мышки на главной странице
    animateScrolldownTrigger();
  }

  if ($aboutUsSection) { // Анимация секции "О нас" на главной
    animateAboutSection();
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
      .fromTo('#promo-logo-linear-gradient',
        4,
        {attr: {gradientTransform: 'translate(-1,1)'}},
        {attr: {gradientTransform: 'translate(3,1)'}}, '-=1')
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
      triggerElement: '#projects',
      triggerHook: 1,
      duration: '100%'
    })
      .setTween(tl)
      .addTo(controller);
  }

});
