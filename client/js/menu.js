// GreenBite - Menu Page JS
// Filter + Add to Cart

document.addEventListener('DOMContentLoaded', function() {

  // --- Category Filter ---
  var filterButtons = document.querySelectorAll('.filter-btn');
  var menuCards = document.querySelectorAll('.menu-card');

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function() {
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      this.classList.add('active');

      var category = this.getAttribute('data-category');
      for (var k = 0; k < menuCards.length; k++) {
        if (category === 'all' || menuCards[k].getAttribute('data-category') === category) {
          menuCards[k].classList.remove('hide');
        } else {
          menuCards[k].classList.add('hide');
        }
      }
    });
  }

  // --- Add to Cart ---
  var addButtons = document.querySelectorAll('.add-to-cart-btn');
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', function() {
      var card = this.closest('.menu-card');
      var name = card.querySelector('h3').textContent;
      var priceText = card.querySelector('.price').textContent;
      var price = parseInt(priceText.replace('₹', ''));
      var image = card.querySelector('img').src;

      addToCart(name, price, image);

      // Show feedback
      this.textContent = '✓ Added';
      this.classList.add('added');
      var btn = this;
      setTimeout(function() {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
      }, 1500);
    });
  }

});
