'use strict';

$(document).ready(init);

function init(){
  $("#submit").on("click", newMessage);
}

function newMessage(e){
  e.preventDefault();
  var contactName = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var notes = $('#notes').val();
  var newMessage = {name: contactName, email: email, phone: phone, notes: notes};

  $.post('/messages/add', newMessage)
    .success(function(data){
      window.location = "/messages";
    })
}
