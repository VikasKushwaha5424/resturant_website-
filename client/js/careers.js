// GreenBite - Careers Form Validation

document.addEventListener('DOMContentLoaded', function() {

  var form = document.getElementById('careers-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = form.querySelector('[name="name"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var year = form.querySelector('[name="year"]').value;
    var position = form.querySelector('[name="position"]').value;

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

    if (!year) {
      showError('year', 'Please select your year of study.');
      hasError = true;
    }

    if (!position) {
      showError('position', 'Please select a position.');
      hasError = true;
    }

    if (!hasError) {
      alert('Application submitted successfully! We will contact you on WhatsApp within 2-3 days. Thank you, ' + name + '!');
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
