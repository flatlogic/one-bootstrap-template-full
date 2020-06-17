$(function(){
    function initGmap(){
        let map = new GMaps({
            el: '#gmap',
            lat: -37.813179,
            lng: 144.950259,
            zoomControl : false,
            panControl : false,
            streetViewControl : false,
            mapTypeControl: false,
            overviewMapControl: false
        });

        setTimeout( function(){
            map.addMarker({
                lat: -37.813179,
                lng: 144.950259,
                animation: google.maps.Animation.DROP,
                draggable: true,
                title: 'Here we are'
            });
        }, 3000);
    }

    $(document).ready(function(){
        let my_posts = $("[rel=tooltip]");

        let size = $(window).width();
        for(i=0;i<my_posts.length;i++){
            the_post = $(my_posts[i]);

            if(the_post.hasClass('invert') && size >=767 ){
                the_post.tooltip({ placement: 'left'});
                the_post.css("cursor","pointer");
            }else{
                the_post.tooltip({ placement: 'rigth'});
                the_post.css("cursor","pointer");
            }
        }
    });

    function pageLoad(){
        initGmap();

        $('.event-image > a').magnificPopup({
            type: 'image'
        });
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
