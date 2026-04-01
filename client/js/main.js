// GreenBite - Main JavaScript
// Mobile Navigation Toggle

document.addEventListener('DOMContentLoaded', function() {

  // Mobile nav toggle
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    }
  }

});
