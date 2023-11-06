// Toggle chat dialog on icon click
$('.chat-btn, .chat-gpt-logo').on  ('click', function() {
  $('.chat-box').toggle();
});

function handleKeyPress(event) {
  if (event.keyCode === 13) {
      // Run your function here
      sendAjaxRequest();
  }
}
var guid ='';
$(document).ready(function() {
  guid = generateGUID();
});


function sendAjaxRequest() {
  var inputValue = $('#cc-input').val();

  $('#cc-input').val('');

  // Create a new <span> element
  var template = document.getElementById('template-2');
  // Clone the template
  var clone = template.cloneNode(true);
  // Modify the span value
  var span = clone.querySelector('span');
  span.textContent = inputValue;
  // Add the modified clone to the cc-history div
  var ccHistory = document.getElementById('cc-history');
  ccHistory.insertBefore(clone, ccHistory.firstChild);
  // Make the clone visible by removing the hidden class (if necessary)
  clone.classList.remove('hidden');

  $('#chat-control').addClass('loading');
  $('#chat-control input, #chat-control button').attr('disabled', true);
    

  $.ajax({
      url: 'http://localhost:3000/ask',
      method: 'GET',
      data: {
          id: guid,
          prompt: inputValue
      },
      success: function(response) {
          // Create a new <span> element
          var template = document.getElementById('template-1');
          // Clone the template
          var clone = template.cloneNode(true);
          // Modify the span value
          var span = clone.querySelector('span');
          span.textContent = response.text;
          // Add the modified clone to the cc-history div
          var ccHistory = document.getElementById('cc-history');
          ccHistory.insertBefore(clone, ccHistory.firstChild);
          // Make the clone visible by removing the hidden class (if necessary)
          clone.classList.remove('hidden');


          $('#chat-control').removeClass('loading');
          $('#chat-control input, #chat-control button').removeAttr('disabled');
      },
  });

  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
