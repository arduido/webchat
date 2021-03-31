localStorage.clear();
var userName = prompt('Enter your Name...', 'User');
var nam = document.getElementById('userName');
nam.innerHTML = userName;
// here I am making these key elements accessible from a single variable
var inputField = document.getElementById('messageInput');
var chatDisplay = document.getElementById('chatDisp');
var typing = document.getElementById('typing');

inputField.addEventListener('keydown', function () {
  typing.style.visibility = 'visible';
});

inputField.addEventListener('keyup', function () {
  typing.style.visibility = 'hidden';
});
//var randnum = Math.floor(Math.random() * 21);

var displayChat = document.getElementById('chatDisp');

if (!localStorage.getItem('chat')) {
  // we are setting 'chat' to be able to return the stringified object inside an array json.stringify([])
  localStorage.setItem('chat', JSON.stringify([]));
}
// here chatHistory is becoming an object using json.parse
var chatHistory = JSON.parse(localStorage.getItem('chat'));
//somewhere in the document we needed to set a variable to 0 to work with our stringified object inside the array above
var i = 0;
var send = document.getElementById('sendMessage');
//this is just a way to test if the input has any text to display and a way to alert the user if it is blank
send.addEventListener('click', function () {
  if (document.getElementById('messageInput').value == '') {
    $('#textModal').modal('show');
    return;
  }
  // this allows us to assign a random number from 0 - 20
  let randnum = Math.floor(Math.random() * 21);
  //
  var message = {
    name: userName,
    text: document.getElementById('messageInput').value,
    dateTime: new Date().toLocaleTimeString() + ' ' + new Date().toDateString(),
    src: 'http://robohash.org/' + randnum + '.png?set=set3',
  };
  //here the message object from above is being pushed on to the chatHistory array
  chatHistory.push(message);
  document.getElementById('messageInput').value = '';
  // we are taking what has been constructed with json.stringify and making it accessible by calling chat with getitem
  localStorage.setItem('chat', JSON.stringify(chatHistory));
  //the json parse will make the keys accessible
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
