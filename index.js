const express = require('express');
const app = express();


const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});
app.get('/hidde', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});
app.get('/thomas', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});
 const rooms = io.of('/rooms')

rooms.on('connection', (socket) => {
   socket.on('join', (data) =>{
       socket.join(data.room)
       rooms.in(data.room).emit('message',`New user joined ${data.room} room!`)
   });
    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        rooms.in(data.room).emit('message', data.msg);
    });
    socket.on('disconnect',() => {
        console.log('user disconnected');
        rooms.emit('message','user disconnected');
    })
})