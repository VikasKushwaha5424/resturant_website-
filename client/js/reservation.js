// GreenBite - Reservation Form Validation

document.addEventListener('DOMContentLoaded', function() {

  var form = document.getElementById('reservation-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var date = form.querySelector('[name="date"]').value;
    var time = form.querySelector('[name="time"]').value;
    var guests = form.querySelector('[name="guests"]').value;

    // Clear previous errors
    var groups = form.querySelectorAll('.form-group');
    for (var i = 0; i < groups.length; i++) {
      groups[i].classList.remove('error');
    }

    var hasError = false;

    // Validate name
    if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters.');
      hasError = true;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      hasError = true;
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(phone.replace(/[\s\-]/g, ''))) {
      showError('phone', 'Please enter a valid 10-digit phone number.');
      hasError = true;
    }

    // Validate date
    if (!date) {
      showError('date', 'Please select a date.');
      hasError = true;
    } else {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(date) < today) {
        showError('date', 'Date must be today or in the future.');
        hasError = true;
      }
    }

    // Validate time
    if (!time) {
      showError('time', 'Please select a time.');
      hasError = true;
    }

    // Validate guests
    var guestNum = parseInt(guests);
    if (!guests || guestNum < 1 || guestNum > 20) {
      showError('guests', 'Party size must be between 1 and 20.');
      hasError = true;
    }

    // If no errors, send to backend
    if (!hasError) {
      var formData = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests
      };

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Booking...';
      submitBtn.disabled = true;

      fetch('http://127.0.0.1:5000/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function(response) {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(function(data) {
        alert('Reservation confirmed! We will send a confirmation to your email shortly.');
        form.reset();
      })
      .catch(function(error) {
        console.error('Error:', error);
        alert('Oops! Make sure the Flask server (app.py) is running.');
      })
      .finally(function() {
        submitBtn.textContent = 'Book Table';
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
