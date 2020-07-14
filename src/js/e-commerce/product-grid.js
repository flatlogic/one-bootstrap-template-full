$(function() {
  function pageLoad() {
    $('.js-slider').slider();

    $("#product-grid .view ").on("click", function(e) {
      let target = $(e.target);
      $("#product-grid .view ").removeClass('active');
      target.addClass('active');
    });

    $("#mobile-filter").on("click", function(e) {
      $("#filter").toggleClass('d-none');
    });

  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
