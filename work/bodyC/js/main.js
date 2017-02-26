$(function() {

  // Open menu on hamburger click
	$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
		console.log($('#contact-h1').css('color'))
		if ($('#contact-h1').css('color') === 'rgb(192, 192, 192)') {
			$('#contact-h1').css('color', '#212f2d');
		} else {
			$('#contact-h1').css('color', '#c0c0c0');
		}
  });

  // Close menu on link click
  $('.nav-link').click(function() {
    $('#toggle').toggleClass('active');
    $('#overlay').toggleClass('open');
		$('#contact-h1').toggleClass('menu-down');
  });

	// Expand/Collapse containers
	const collapse = document.getElementsByClassName('collapse-head');

	for (let i = 0; i < collapse.length; i++) {
		collapse[i].onclick = function(){
			$(this).toggleClass('active');
			$(this).next().toggleClass('show');
			$(this).children().first().toggleClass('btn-turn');
		}
	}

	// Float tablet down article picker
	const choice = document.getElementsByClassName('float-choice');

	for (let i = 0; i < choice.length; i++) {
		choice[i].onclick = function(){
			$(".float-choice").removeClass('active');
			$(this).toggleClass("active");

			// Get height of article-container
			if ($(this).hasClass('float-info-choice')) {
				let height = $('.float-info').height();
				$('.article-container').css("height", height);
				$('.float-articles').css('opacity', '0');
				$('.float-articles').css('visibility', 'hidden');
				setTimeout(function(){
					$('.float-info').css('visibility', 'visible');
					$('.float-info').css('opacity', '1');
				}, 300);
			}
			else if ($(this).hasClass('float-expect-choice')) {
				let height = $('.float-expect').height();
				$('.article-container').css("height", height);
				$('.float-articles').css('opacity', '0');
				$('.float-articles').css('visibility', 'hidden');
				setTimeout(function(){
					$('.float-expect').css('visibility', 'visible');
					$('.float-expect').css('opacity', '1');
				}, 300);
			}
			else if ($(this).hasClass('float-faq-choice')) {
				let height = $('.float-faq').height();
				$('.article-container').css("height", height);
				$('.float-articles').css('opacity', '0');
				$('.float-articles').css('visibility', 'hidden');
				setTimeout(function(){
					$('.float-faq').css('visibility', 'visible');
					$('.float-faq').css('opacity', '1');
				}, 300);
			}
		};
	}

	(function toTopButton(offset, duration){
		// Show and hide to top button
		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$('#to-top').fadeIn(duration + 200);
			} else {
				$('#to-top').fadeOut(duration + 200);
			}
		});
		// Smooth scroll to top
		$('#to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		});
	}(250, 400))

});
