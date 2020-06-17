import 'bootstrap-sass';
import './scss/style.scss';

var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["test", "nightlife", "series-movies", "sports"];
var isCurrentRoom = validRooms.includes(roomName);
const time = require('moment');
const socket = io('/tech');
if (isCurrentRoom) {
    const room = roomName;
    
    $('form').submit(() => {
        let msg = $('#m').val();
        let user = localStorage.getItem('userName');
      
        socket.emit('message', { msg, room, user,time });
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
            $('#messages').append($('<li class="message message-self bg-custom-blue">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data.user +'</span>'+ '<span class="message-text">'+  data.msg +'</span>'+ '<span class="message-time">'+data.time+ '</span>'+ '</li>'));
            
        }else{
            $('#messages').append($('<li class="message">'+ '<span class="message-username">'+ '<i class="fa fa-user">'+'</i> ' + data.user +'</span>'+ '<span class="message-text">'+  data.msg +'</span>'+'<span class="message-time">'+data.time+ '</span>'+ '</li>'));
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
    // $('.room-name').text(roomName);
  
  
    var title = $('title').html();
    $('title').html(title.replace("{{room}}",roomName));

    $('body').on('click','._saveUserName', (event) => {
        event.preventDefault();
        var userName = $('._userName').val();
        localStorage.setItem('userName',userName);
        // socket.emit('join', { room: 'test', user:userName });
        socket.on('connect', () => {
            let user = localStorage.getItem('userName');      
            //emitting to everybody
            socket.emit('join', { room: 'test', user:userName });
      
        });
        
        window.location.href = '/test';
    });

    $('#home').on('click', () => {
        location.href = '/'    
    });
    $('#users').on('click', () =>{
        location.href = '/users'    
    });
    $('#room').on('click', () => {
        location.href = '/test'    
    });
    // $('.sports').on('click', () => {
    //     location.href = '/sports'    
    // });
    // $('.test').on('click', () =>{
    //     location.href = '/test'
          
    // });
    // $('.series').on('click', () => {
    //     location.href = '/series-movies'    
    // });
    // $('.night').on('click', () => {
    //     location.href = '/rooms'    
    // });
   
    if (window.innerWidth < 1024) {
        $( ".room-item" ).click( () => {
          $( "#rooms-container" ).fadeOut( 0, (e) => {
            event.preventDefault(e);
            $( ".fadeout" ).fadeOut(0)
            $(".chat-container").fadeIn(0)
            $(".chat-list").fadeIn(0)
            $(".mobile-input").fadeIn(0)
            });
        });
        $(".chat-list").animate({ scrollTop: 20000000 }, "slow");
        $("#submit").click(() =>{
            $('.chat-list').animate({
                scrollTop: $('.chat-list')[0].scrollHeight}, "slow");
        });
      }
        $(".chat-list").animate({ scrollTop: 20000000 }, "slow");
            
        $(()=>{
            $("#submit").click(() =>{
                $('.chat-list').animate({
                    scrollTop: $('.chat-list')[0].scrollHeight}, "slow");
            });
        });

        var trigger = $("#hamburger"),
            isClosed = false;

        trigger.click(function () {
            burgerTime();
        });

        function burgerTime() {
            if (isClosed == true) {
                trigger.removeClass("is-open");
                trigger.addClass("is-closed");
                isClosed = false;
            } else {
                trigger.removeClass("is-closed");
                trigger.addClass("is-open");
                isClosed = true;
            }
        }
        

});
$(".navigation li a").on('click', function (e) {
    e.preventDefault();
    $(".navigation li a.active").removeClass("active");
    $(this).addClass("active");
    // $(activeTab).show();
    return false;
});
// $("#rooms-container li").on('click', function () {

//     $("#rooms-container li.active-rooms").removeClass("active-rooms");
//     $(this).addClass("active-rooms");
//     // $(activeTab).show();
//     return false;
// });
// ("#rooms-container li").click(function() {
//     $("#rooms-container li").removeClass('active-rooms');
//     $(this).addClass('active-rooms');
//   });

// $(function() {
//     $( 'ul#rooms-list li' ).on( 'click', function() {
//           $( this ).parent().find( 'li.active-rooms' ).removeClass( 'active-rooms' );
//           $( this ).addClass( 'active-rooms' );
//     });
// });


      // toggle menu content <ul>
      document.getElementById('nav-toggle').onclick =  ()=>{
        document.getElementById("nav-content").classList.toggle("hidden");
    }
  

  
   