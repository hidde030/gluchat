
// $( ".room-item" ).click(function() {
//   $( "#rooms-container" ).fadeOut( 0, function() {
//     $(".chat-container").fadeIn(0)
//     $(".chat-list").fadeIn(0)
    
//   });
// });
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
