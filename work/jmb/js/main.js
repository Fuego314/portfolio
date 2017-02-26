  $(function() {
    "use strict";

    // SCROLLSPY INIT
    $('body').scrollspy({target: "#navigation", offset: 50});

    // STICKY NAV
    let windowWidth = $( window ).width();

    let affixStart = () => {
      if (windowWidth < 751) {

        $('.navigation').affix({offset: {top: 70} });
        $('.navigation').data('bs.affix').options.offset.top = 70;
      } else {
        $('.navigation').affix({offset: {top: 110} });
        $('.navigation').data('bs.affix').options.offset.top = 110;
      }
    }
    affixStart();

    $(window).resize(() => {
      windowWidth = $(window).width();
      affixStart();
    });


    // ANIMATE SCROLL
    $("#navigation li a[href^='#'], #footer-links li a[href^='#'], .contact-btn[href^='#'], .btn-link[href^='#'], .heading-title[href^='#'], .service-img a[href^='#']").on('click', function(e) {
      // Prevent default anchor click behavior
      e.preventDefault();

      console.log(this.className)

      // Depending on screen width get offset
      let navOffset;
      if (windowWidth < 920) {
        navOffset = 46;
        if (this.className === 'main-nav') {
          $('#menu-button').toggleClass('menu-opened');
          $('#navigation ul').toggleClass('open');
          $('#navigation ul').css('display', 'none');
        }
      } else {
        navOffset = 49;
      }

      // Account for navbar if fixed
      if (navOffset === 46 && $('#nav').hasClass('affix-top')) {
        navOffset*= 2;
      } else if (navOffset === 49 && $('#nav').hasClass('affix-top')) {
        navOffset*= 2;
      }

      // Store hash
      let hash = this.hash;
      let scrollTo = $(this.hash).offset().top - navOffset;

      // Animate
      $('html, body').animate({
        scrollTop: scrollTo
      }, 700, function(){

        // When done, add hash to url
        // (default click behaviour)
        window.location.hash = hash;
      });

    });

    // TOP CAROUSEL SETTINGS
    $('.slider').slick({
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true
    });


    // TESTIMONIAL SETTINGS
    $('.testimonial-v2').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false,
      dots:true,
      autoplay:true,
      autoplaySpeed: 4000
    });

    // SCROLL TO TOP
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      if( $(this).scrollTop() > offset_opacity ) {
        $back_to_top.addClass('cd-fade-out');
      }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
        }, scroll_top_duration
      );
    });

  });
