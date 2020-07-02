$(function() {
  function pageLoad() {
    $('.js-slider').slider();

    $("#product-grid .view ").on("click", function(e) {
      let target = $(e.target);
      $("#product-grid .view ").removeClass('active');
      target.addClass('active');
    });

  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
