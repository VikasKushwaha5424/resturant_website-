// GreenBite - Gallery Page
// Lightbox and category filtering

document.addEventListener('DOMContentLoaded', function() {

  // --- Category Filter ---
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function() {
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      this.classList.add('active');

      var category = this.getAttribute('data-category');

      for (var k = 0; k < galleryItems.length; k++) {
        if (category === 'all' || galleryItems[k].getAttribute('data-category') === category) {
          galleryItems[k].classList.remove('hide');
        } else {
          galleryItems[k].classList.add('hide');
        }
      }
    });
  }

  // --- Lightbox ---
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;

  // Get only visible (not hidden) items
  function getVisibleItems() {
    var visible = [];
    for (var i = 0; i < galleryItems.length; i++) {
      if (!galleryItems[i].classList.contains('hide')) {
        visible.push(galleryItems[i]);
      }
    }
    return visible;
  }

  // Open lightbox
  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener('click', (function(index) {
      return function() {
        var visible = getVisibleItems();
        // Find this item's index in visible array
        for (var v = 0; v < visible.length; v++) {
          if (visible[v] === galleryItems[index]) {
            currentIndex = v;
            break;
          }
        }
        lightboxImg.src = visible[currentIndex].querySelector('img').src;
        lightbox.classList.add('active');
      };
    })(i));
  }

  // Close lightbox
  closeBtn.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  // Click outside image to close
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Previous image
  prevBtn.addEventListener('click', function() {
    var visible = getVisibleItems();
    currentIndex--;
    if (currentIndex < 0) currentIndex = visible.length - 1;
    lightboxImg.src = visible[currentIndex].querySelector('img').src;
  });

  // Next image
  nextBtn.addEventListener('click', function() {
    var visible = getVisibleItems();
    currentIndex++;
    if (currentIndex >= visible.length) currentIndex = 0;
    lightboxImg.src = visible[currentIndex].querySelector('img').src;
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

});
