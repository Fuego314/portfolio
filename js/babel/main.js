'use strict';

$(function () {
  "use strict";

  // Init animsition

  $('.animsition').animsition({
    inClass: 'fade-in',
    inDuration: 1500,
    loading: false
  });

  // Nav toggle animation and open close menu
  function navToggle() {
    $('.top-bar').toggleClass('top-bar-open');
    $('.middle-bar').toggleClass('middle-bar-open');
    $('.bottom-bar').toggleClass('bottom-bar-open');
    $('nav').toggleClass('open');
  }

  // Animate on scroll
  $('.nav-link[href^="#"], .overlay a[href^="#"]').click(function (e) {
    // Prevent default anchor click behavior
    e.preventDefault();

    // Get window width on click
    var windowWidth = $(window).width();

    if (windowWidth < 768 && this.className === 'nav-link') {
      navToggle();
    }

    // Get offset
    var navOffset = 0,
        clicked = this.href.split('#')[1];

    // If skills/portfolio/contact clicked add offset
    if (clicked !== 'about') {
      navOffset = 57;
    }

    // Store hash
    var hash = this.hash,
        scrollTo = $(this.hash).offset().top - navOffset;

    $('html, body').animate({
      scrollTop: scrollTo
    }, 700, function () {

      // When done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;
    });
  });

  // Set heights for header and video
  var headerHeight = window.innerHeight,
      navMain = $('nav');

  $('#header').css('height', headerHeight);
  $('video').css('max-height', $('#header').css('height'));

  // Show navigation on scroll function
  function showNav(height) {
    if (height > headerHeight - 3) {
      if (navMain.hasClass('transparent')) {
        navMain.removeClass('transparent').addClass('opaque').css('background', 'rgba(81, 81, 81, 1)');
        if ($('.navbar').hasClass('open')) navToggle();
      }
    } else {
      if (navMain.hasClass('opaque')) {
        navMain.removeClass('opaque').addClass('transparent').css('background', 'rgba(81, 81, 81, .4)');
      }
    }
  }

  showNav($(window).scrollTop());

  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    showNav(scroll);
  });

  // Switch between mobile and full navbar
  $(window).resize(function () {
    var navbar = $('.navbar'),
        nav = $('nav');

    if (innerWidth >= 768) {
      navbar.addClass('full');
    }

    if (innerWidth >= 768) {
      // If nav menu is open when switches to full nav close it
      if (nav.hasClass('open')) {
        $('.top-bar').removeClass('top-bar-open');
        $('.middle-bar').removeClass('middle-bar-open');
        $('.bottom-bar').removeClass('bottom-bar-open');
        nav.toggleClass('open');
      }
    }
  });

  // Show nav toggle animation and open close menu on click
  $('.navbar-toggle').unbind().click(function () {
    return navToggle();
  });

  // Hover on tools bg position
  var toolNameDiv = $('.tool-name'),
      toolName = $('.tool-name h3');

  function revertTools() {
    var revertToolNameDiv = toolNameDiv.css({ 'top': '82px', left: '83px' }),
        revertToolName = toolName.text('TOOLS').css('font-size', '1.4rem');
  }

  $('.tool').mouseover(function () {
    function nameChanges(top, text, size) {
      toolNameDiv.css('top', top);
      toolName.text(text).css('font-size', size);
    }
    $(this).css('z-index', '4');
    switch (this.classList[1]) {
      case 'sass':
        nameChanges('61px', 'Sass', '2.2rem');
        break;
      case 'github':
        nameChanges('81px', 'Github', '1.43rem');
        break;
      case 'node':
        nameChanges('83px', 'Node.js', '1.35rem');
        break;
      case 'git':
        nameChanges('61px', 'Git', '2.2rem');
        toolNameDiv.css('left', '82px');
        break;
      case 'gulp':
        nameChanges('64px', 'Gulp', '2.1rem');
        break;
      case 'atom':
        nameChanges('70px', 'Atom', '1.85rem');
        break;
      default:
        nameChanges('82px', 'TOOLS', '1.4rem');
    }
  });

  $('.tool').each(function () {
    var _this = this;

    $(this).mouseleave(function () {
      $(_this).css('z-index', '1');
      revertTools();
    });
  });

  // Show 'React' on React icon hover
  $('.learning-icon').mouseover(function () {
    $('.learning-icon p').text('React');
  }).mouseleave(function () {
    $('.learning-icon p').text('');
  });

  // Show portfolio preview info on hover
  if (Modernizr.touchevents) {
    // show the close overlay button
    $(".close").removeClass("hidden");
    // handle the adding of hover class when clicked
    $(".preview").click(function (e) {
      if (!$(this).hasClass("hover")) {
        $(this).addClass("hover");
      }
    });
    // handle the closing of the overlay
    $(".close").click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ($(this).closest(".preview").hasClass("hover")) {
        $(this).closest(".preview").removeClass("hover");
      }
    });
  } else {
    $('.preview').mouseenter(function () {
      $(this).addClass('hover');
      $('.preview.' + this.classList[1] + ' .preview-info').css('opacity', '1');
    }).mouseleave(function () {
      $('.preview').removeClass('hover');

      setTimeout(function () {
        $('.preview-info').css('opacity', '0');
      }, 50);
    });
  }
});