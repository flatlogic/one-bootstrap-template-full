$(function () {
  function _initCarousel() {
    let $carousel = $('.product-carousel');
    let $prev = $('.carousel-left');
    let $next = $('.carousel-right');

    $carousel.slick({
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3
          }
        },
      ],
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
      asNavFor: '.slider-nav',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false
          }
        }
      ],
    });
    $('.slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      respondWith: true,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            arrows: false,
            responsiveHeight: true,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            arrows: false,
            responsiveHeight: true,
          }
        },
      ],
    });
  }

  function pageLoad() {
    _initCarousel();
    mainSlider();
  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
