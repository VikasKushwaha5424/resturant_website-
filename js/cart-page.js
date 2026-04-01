// GreenBite - Cart Page JS
// Renders cart items and handles quantity changes

document.addEventListener('DOMContentLoaded', function() {
  renderCart();
});

function renderCart() {
  var cartContainer = document.getElementById('cart-container');
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="cart-empty">' +
      '<div class="icon">🛒</div>' +
      '<h3>Your cart is empty</h3>' +
      '<p>Browse our menu and add some delicious items!</p>' +
      '<a href="menu.html" class="btn btn-primary" style="margin-top:15px;">Browse Menu</a>' +
      '</div>';
    return;
  }

  var html = '<table class="cart-table">';
  html += '<thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead>';
  html += '<tbody>';

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html += '<tr>';
    html += '<td><div class="item-name"><img src="' + item.image + '" alt="' + item.name + '"><span>' + item.name + '</span></div></td>';
    html += '<td>₹' + item.price + '</td>';
    html += '<td><div class="qty-controls">';
    html += '<button class="qty-btn" onclick="changeQuantity(\'' + item.name.replace(/'/g, "\\'") + '\', -1)">−</button>';
    html += '<span>' + item.qty + '</span>';
    html += '<button class="qty-btn" onclick="changeQuantity(\'' + item.name.replace(/'/g, "\\'") + '\', 1)">+</button>';
    html += '</div></td>';
    html += '<td>₹' + (item.price * item.qty) + '</td>';
    html += '<td><button class="remove-btn" onclick="removeItem(\'' + item.name.replace(/'/g, "\\'") + '\')">✕</button></td>';
    html += '</tr>';
  }

  html += '</tbody></table>';

  html += '<div class="cart-summary">';
  html += '<div class="total">Total: ₹' + getCartTotal() + '</div>';
  html += '<button class="btn btn-primary" onclick="placeOrder()">Place Order</button>';
  html += '</div>';

  cartContainer.innerHTML = html;
}

function changeQuantity(name, delta) {
  changeQty(name, delta);
  renderCart();
}

function removeItem(name) {
  removeFromCart(name);
  renderCart();
}

function placeOrder() {
  if (cart.length === 0) return;
  window.location.href = 'checkout.html';
}
