const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const db = require('./utils/queries');
const moment = require('moment');
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

app.get('/rooms', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html'); 
});


app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});

app.get('/nightlife', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});

app.get('/series-movies', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});

app.get('/sports', (req, res) => {
    res.sendFile(__dirname + '/public/rooms.html');
});
app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/public/users.html');
});

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.join(data.users);
        db.getChats(data.room).then( val => {
            // console.log(val);
            tech.to(socket.id).emit('historyChats',val);
            tech.in(data.room).emit('singleMessage', `${data.user} joined ${data.room} room!`);
        });
        db.getUser(data.users).then(() => {
            tech.to(socket.id).emit('users', [{user: data.users}]);
        })
       
    });

    socket.on('message', (data) => {
        console.log(`message ${data.msg}`);


        var message = {
            user: data.user,
            room: data.room,
            msg: data.msg,
            time: moment().format('h:mm a')
        };
        console.log(message)

        let insert = db.insertChats(message);
        tech.in(data.room).emit('message', message);
    });

    socket.on('disconnect', () => {
        tech.emit('singleMessage', 'user disconnected');
    })
});
