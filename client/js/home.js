// GreenBite - Home Page
// Simple Hero Image Slider

document.addEventListener('DOMContentLoaded', function() {

  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots span');
  var current = 0;

  function showSlide(index) {
    // Hide current slide
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Update index
    current = index;
    if (current >= slides.length) current = 0;
    if (current < 0) current = slides.length - 1;

    // Show new slide
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // Auto-play every 4 seconds
  setInterval(function() {
    showSlide(current + 1);
  }, 4000);

  // Click on dots to change slide
  for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', (function(index) {
      return function() {
        showSlide(index);
      };
    })(i));
  }

});
