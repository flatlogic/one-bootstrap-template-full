$(function() {
  function pageLoad() {

    $("#product-grid .view ").on("click", function(e) {
      let target = $(e.target);
      $("#product-grid .view ").removeClass('active');
      target.addClass('active');
    });

  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
