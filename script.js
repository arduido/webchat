localStorage.clear();
var userName = prompt('Enter your Name...', 'User');
var nam = document.getElementById('userName');
nam.innerHTML = userName;

var inputField = document.getElementById('messageInput');
var chatDisplay = document.getElementById('chatDisp');
var typing = document.getElementById('typing');

inputField.addEventListener('keydown', function () {
  typing.style.visibility = 'visible';
});

inputField.addEventListener('keyup', function () {
  typing.style.visibility = 'hidden';
});
var randnum = Math.floor(Math.random() * 21);

var displayChat = document.getElementById('chatDisp');

if (!localStorage.getItem('chat')) {
  localStorage.setItem('chat', JSON.stringify([]));
}
var chatHistory = JSON.parse(localStorage.getItem('chat'));

var send = document.getElementById('sendMessage');
var i = 0;
send.addEventListener('click', function () {
  if (document.getElementById('messageInput').value == '') {
    // alert('please Enter something in Chat....');
    // return;
    $('#textModal').modal('show');
    return;
  }

  var message = {
    name: userName,
    text: document.getElementById('messageInput').value,
    dateTime: new Date().toLocaleTimeString() + ' ' + new Date().toDateString(),
    src: 'http://robohash.org/' + randnum + '.png?set=set3',
  };
  chatHistory.push(message);
  document.getElementById('messageInput').value = '';
  localStorage.setItem('chat', JSON.stringify(chatHistory));

  localData = localStorage.getItem('chat');
  localData = JSON.parse(localData);
  var templateDiv =
    "<div class='message media pt-3 alert alert-light'>" +
    "<img class='avatar' src='" +
    localData[i].src +
    "' alt=''/>" +
    "<p class='text media-body'>" +
    "<strong class='d-block text-gray-dark'> @" +
    localData[i].name +
    '</strong>' +
    localData[i].text +
    '</p>' +
    "<span class='datetime'>" +
    localData[i].dateTime +
    '</span>' +
    '</div>' +
    "<div class='clearfix'></div> <hr>";
  i++;
  chatDisplay.innerHTML += templateDiv;
});
