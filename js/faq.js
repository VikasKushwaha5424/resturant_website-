// GreenBite - FAQ Accordion

document.addEventListener('DOMContentLoaded', function() {

  var questions = document.querySelectorAll('.faq-question');

  for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function() {
      var item = this.parentElement;
      var wasActive = item.classList.contains('active');

      // Close all
      var allItems = document.querySelectorAll('.faq-item');
      for (var j = 0; j < allItems.length; j++) {
        allItems[j].classList.remove('active');
      }

      // Toggle clicked one
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  }

});
