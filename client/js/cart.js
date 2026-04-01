// GreenBite - Cart System
// Stores cart in localStorage so it persists across pages

var cart = JSON.parse(localStorage.getItem('greenbite-cart')) || [];

function saveCart() {
  localStorage.setItem('greenbite-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  var countEls = document.querySelectorAll('.cart-count');
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }
  for (var j = 0; j < countEls.length; j++) {
    countEls[j].textContent = total;
    countEls[j].style.display = total > 0 ? 'flex' : 'none';
  }
}

function addToCart(name, price, image) {
  // Check if item already in cart
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty += 1;
      saveCart();
      return;
    }
  }
  // Add new item
  cart.push({ name: name, price: price, image: image, qty: 1 });
  saveCart();
}

function removeFromCart(name) {
  cart = cart.filter(function(item) { return item.name !== name; });
  saveCart();
}

function changeQty(name, delta) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  saveCart();
}

function getCartTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

// Update count on every page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
