$(function () {
  function _initCarousel() {
    let $carousel = $('.product-carousel');
    let $prev = $('.carousel-left');
    let $next = $('.carousel-right');
    let slidesToShow = Sing.isScreen('xs') || Sing.isScreen('sm') ? 2 : 4;


    $carousel.slick({
      slidesToShow,
      prevArrow: $prev,
      nextArrow: $next,
    });
  }

  function mainSlider() {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: true,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
    });
  }

  function pageLoad() {
    _initCarousel();
    mainSlider();
  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
