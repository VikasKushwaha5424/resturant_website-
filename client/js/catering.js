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
      var formData = {
        name: name,
        phone: phone,
        email: email,
        event: event,
        date: date,
        guests: guests
      };

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      fetch('http://127.0.0.1:5000/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function(response) {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(function(data) {
        alert('Thank you for your catering inquiry! We will contact you within 24 hours to discuss details.');
        form.reset();
      })
      .catch(function(error) {
        console.error('Error:', error);
        alert('Oops! Make sure the Flask server (app.py) is running.');
      })
      .finally(function() {
        submitBtn.textContent = 'Submit Inquiry';
        submitBtn.disabled = false;
      });
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
