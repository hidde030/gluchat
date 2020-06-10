import 'bootstrap-sass';
import './scss/style.scss';

var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["test", "nightlife", "series-movies", "sports"];
var isCurrentRoom = validRooms.includes(roomName);
const moment = require('moment');

if (isCurrentRoom) {
    const room = roomName;
    const socket = io('/tech');
    $('form').submit(() => {
        let msg = $('#m').val();
        let user = localStorage.getItem('userName');
      
        socket.emit('message', { msg, room, user });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        let user = localStorage.getItem('userName');      
        //emitting to everybody
        socket.emit('join', { room: room, user:user });
  
    });

    socket.on('message', (data) => {
        let user = localStorage.getItem('userName');
        if(user == data.user){
            $('#messages').append($('<li class="message message-self bg-custom-blue">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data.user +'</span>'+ '<span class="message-text">'+  data.msg +'</span>'+'</li>'));
            
        }else{
            $('#messages').append($('<li class="message">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data.user +'</span>'+ '<span class="message-text">'+  data.msg +'</span>'+'</li>'));
        }

    });

    socket.on('singleMessage', (msg) => {
        $('#messages').append($('<li class="message">').text(msg));
    });

    socket.on('historyChats', (data) => {
        let user = localStorage.getItem('userName');

        for (var i = 0; i < data.length; i++) {
            if(user == data[i].user_name){
                $('#messages').append($('<li class="message message-self bg-custom-blue">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data[i].user_name  +'</span>'+ '<span class="message-text">'+   data[i].chat_text+'</span>'+'</li>'));
            }else{
                $('#messages').append($('<li class="message">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data[i].user_name  +'</span>'+ '<span class="message-text">'+   data[i].chat_text+'</span>'+'</li>'));
            }
        }

    });
}

$( document ).ready( () => {
    $('.room-name').text(roomName);
    var title = $('title').html();
    $('title').html(title.replace("{{room}}",roomName));

    $('body').on('click','._saveUserName', (event) => {
        event.preventDefault();
        var userName = $('._userName').val();
        localStorage.setItem('userName',userName);
        window.location.href = '/rooms';
    });

    if (window.innerWidth < 1024) {
        $( ".room-item" ).click(function() {
          $( "#rooms-container" ).fadeOut( 0, function() {
            event.preventDefault();
            $( ".fadeout" ).fadeOut(0)
            $(".chat-container").fadeIn(0)
            $(".chat-list").fadeIn(0)
            $(".mobile-input").fadeIn(0)
            });
        });
      
      }
      
});