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
    var submitBtn = form.querySelector('button[type="submit"]');

    // Clear previous errors
    var groups = form.querySelectorAll('.form-group');
    for (var i = 0; i < groups.length; i++) {
      groups[i].classList.remove('error');
      // Also clear the error text immediately
      groups[i].querySelector('.error-msg').textContent = "";
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

    // If valid, send to Flask backend
    if (!hasError) {
      // 1. Package the data into an object
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
      };

      // Change button state so user knows it's loading
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;

      // 2. Send it to the Flask server
      fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
           throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // Show success and clear the form
        alert('Thank you for your message! It has been saved securely.');
        form.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Oops! Ensure your Flask server (app.py) is running in the terminal.');
      })
      .finally(() => {
        // Re-enable the button when done
        submitBtn.textContent = 'Send Message';
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