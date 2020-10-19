$(function(){

  function pageLoad(){
    let token = localStorage.getItem('token');
    if (token) {
      window.location.replace('/dashboard/index.html');
    }
  }


  pageLoad();
  SingApp.onPageLoad(pageLoad);

});
