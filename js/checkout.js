// GreenBite - Checkout Page JS
// Renders order summary and handles checkout form

document.addEventListener('DOMContentLoaded', function() {

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderOrderSummary();
  setupForm();
});

function renderOrderSummary() {
  var itemsContainer = document.getElementById('checkout-items');
  var html = '';

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html += '<div class="summary-item">';
    html += '<span>' + item.name + ' × ' + item.qty + '</span>';
    html += '<span>₹' + (item.price * item.qty) + '</span>';
    html += '</div>';
  }

  itemsContainer.innerHTML = html;

  var subtotal = getCartTotal();
  var delivery = 20;
  document.getElementById('summary-subtotal').textContent = '₹' + subtotal;
  document.getElementById('summary-delivery').textContent = '₹' + delivery;
  document.getElementById('summary-total').textContent = '₹' + (subtotal + delivery);
}

function setupForm() {
  var form = document.getElementById('checkout-form');
  var addressSelect = document.getElementById('chk-address');
  var customGroup = document.getElementById('custom-address-group');

  // Show/hide custom address field
  addressSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customGroup.style.display = 'block';
    } else {
      customGroup.style.display = 'none';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = form.querySelector('[name="name"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var address = form.querySelector('[name="address"]').value;
    var payment = form.querySelector('[name="payment"]:checked').value;

    // Clear errors
    var groups = form.querySelectorAll('.form-group');
    for (var i = 0; i < groups.length; i++) {
      groups[i].classList.remove('error');
    }

    var hasError = false;

    if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters.');
      hasError = true;
    }

    if (!/^[0-9]{10}$/.test(phone.replace(/[\s\-]/g, ''))) {
      showError('phone', 'Please enter a valid 10-digit phone number.');
      hasError = true;
    }

    if (!address) {
      showError('address', 'Please select a delivery location.');
      hasError = true;
    }

    if (address === 'custom') {
      var customAddr = form.querySelector('[name="custom_address"]').value.trim();
      if (customAddr.length < 10) {
        showError('custom_address', 'Please enter a complete address.');
        hasError = true;
      }
    }

    if (!hasError) {
      var total = getCartTotal() + 20;
      var paymentLabel = payment === 'upi' ? 'UPI' : payment === 'cod' ? 'Cash on Delivery' : 'Card';
      alert('🎉 Order placed successfully!\n\nTotal: ₹' + total + '\nPayment: ' + paymentLabel + '\n\nThank you for ordering from GreenBite, ' + name + '!');
      cart = [];
      saveCart();
      window.location.href = 'index.html';
    }
  });

  function showError(fieldName, message) {
    var input = form.querySelector('[name="' + fieldName + '"]');
    var group = input.closest('.form-group');
    var errorMsg = group.querySelector('.error-msg');
    group.classList.add('error');
    errorMsg.textContent = message;
  }
}
