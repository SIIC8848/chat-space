$(function(){ 

  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__user-name">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__user-name">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
    }
    return html;
  };


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
     })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
 

  var reloadMessages = function () {
    last_message_id = $('.message:last').data("message-id");

    $.ajax({
      url: 'api/messages#index {format: "json"}',
      type: 'get',
      dataType: 'json', 
      data: {id: last_message_id}
    })
    .done(function (messages) {
      var insertHTML = '';
      $.each(messages, function (i, message) {
        insertHTML += buildHTML(message)
      });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
     })
  }
  setInterval(reloadMessages, 4000);
});