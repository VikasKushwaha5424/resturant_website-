// GreenBite - Contact Form Validation

document.addEventListener('DOMContentLoaded', function() {

  var form = document.getElementById('contact-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var subject = form.querySelector('[name="subject"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

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

    // Validate subject
    if (subject.length < 3) {
      showError('subject', 'Subject must be at least 3 characters.');
      hasError = true;
    }

    // Validate message
    if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      hasError = true;
    }

    // If valid, show success
    if (!hasError) {
      alert('Thank you for your message! We will get back to you within 24 hours.');
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
