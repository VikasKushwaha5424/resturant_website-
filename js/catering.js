// GreenBite - Catering Form Validation

document.addEventListener('DOMContentLoaded', function() {

  var form = document.getElementById('catering-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = form.querySelector('[name="name"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var event = form.querySelector('[name="event"]').value;
    var date = form.querySelector('[name="date"]').value;
    var guests = form.querySelector('[name="guests"]').value;

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      hasError = true;
    }

    if (!event) {
      showError('event', 'Please select an event type.');
      hasError = true;
    }

    if (!date) {
      showError('date', 'Please select an event date.');
      hasError = true;
    }

    var guestNum = parseInt(guests);
    if (!guests || guestNum < 10) {
      showError('guests', 'Minimum 10 guests required for catering.');
      hasError = true;
    }

    if (!hasError) {
      alert('Thank you for your catering inquiry! We will contact you within 24 hours to discuss details.');
      form.reset();
    }
  });

  function showError(fieldName, message) {
    var input = form.querySelector('[name="' + fieldName + '"]');
    var group = input.closest('.form-group');
    var errorMsg = group.querySelector('.error-msg');
    group.classList.add('error');
    errorMsg.textContent = message;
  }

});
