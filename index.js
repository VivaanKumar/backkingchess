const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const cors = require("cors")

app.get('/', (req, res) => {
    res.sendFile(((__dirname) + '/index.html'))
});

app.use(cors({ origin: '*' }));


io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('join', function (room) {
        socket.join(room);



    });

    socket.on('broadcast', function (data) {
        socket.to(data.room).emit((data?.msg?.key), data?.msg?.msg);
    });


});

app.use(cors())

server.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on port 5000');
});