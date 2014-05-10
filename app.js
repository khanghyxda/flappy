var http = require('http'),

    socketIO = require('socket.io'),

    port = process.env.PORT || 8000,

    ip = process.env.IP || '127.0.0.1',

    server = http.createServer().listen(port, ip, function () {
        console.log('Socket.IO server started at %s:%s!', ip, port);
    }),

    io = socketIO.listen(server);

io.set('match origin protocol', true);
io.set('origins', '*:*');
function user_player(){
    this.value =0;
    this.user ='';
}
function player() {
    this.player1 = new user_player();
    this.player2 = new user_player();
}
var arrayPlayer = [];
arrayPlayer.push(new player());
var usernames = {};
var amount_member = [1000];
var rooms = ['Room1'];
var player1 = 0;
var player2 = 0;
var run = function (socket) {
    // Add a user to system
    socket.on('adduser', function () {
        username = makeid();
        socket.username = username;
        socket.room = 'Room1';
        usernames[username] = username;
        socket.join('Room1');
        socket.emit('updatechat', 'SERVER', 'you have connected to Room1');
        socket.broadcast.to('Room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'Room1');
        amount_member[0] = amount_member[0] + 1;
    });
    // Send chat
    socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });
    // Choose user to player1
    socket.on('player1', function () {
        var index = rooms.indexOf(socket.room);
        player1 = arrayPlayer[index].player1.value;
        player2 = arrayPlayer[index].player2.value;
        if (player1 == 0) {
            arrayPlayer[index].player1.value = 1;
            arrayPlayer[index].player1.user = socket.username;
            io.sockets.in(socket.room).emit('player1');
        }
    });
    // Choose user to player2
    socket.on('player2', function () {
        var index = rooms.indexOf(socket.room);
        player1 = arrayPlayer[index].player1.value;
        player2 = arrayPlayer[index].player2.value;
        if (player2 == 0) {
            arrayPlayer[index].player2.value = 1;
            arrayPlayer[index].player2.user = socket.username;
            io.sockets.in(socket.room).emit('player2');
        }
    });
    // Create a room
    socket.on("create", function (roomname) {
        rooms.push(roomname);
        arrayPlayer.push(new player());
        console.log(arrayPlayer);
        amount_member.push(1);
        socket.leave(socket.room);
        socket.join(roomname);
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
        socket.room = roomname;
        socket.broadcast.to(roomname).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        socket.emit('updaterooms', rooms, socket.room);
        socket.broadcast.emit('updaterooms_server');
    });
    socket.on("playerclick", function (a, b) {
        var index = rooms.indexOf(socket.room);
        if(arrayPlayer[index].player1.user==socket.username){
            io.sockets.in(socket.room).emit('player1click', a, b,1);
        }
        if(arrayPlayer[index].player2.user==socket.username){
            io.sockets.in(socket.room).emit('player1click', a, b,2);
        }

        //socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
    });
    socket.on("chimdie",function(die){
            socket.emit("chimdie",die);
    })
    socket.on("startgame", function () {
        var array = [];
        for (var i = 0; i < 1000; i++) {
            array.push(50 + Math.random() * 150);
        }
        io.sockets.in(socket.room).emit('startgame', array);
    });
    socket.on("display_start", function () {
        io.sockets.in(socket.room).emit('display_start');
    });
    socket.on('disconnect', function () {
        console.log('disconnected event');
        var index_old = rooms.indexOf(socket.room);
        amount_member[index_old] = amount_member[index_old] - 1;
        console.log(amount_member);
        console.log(socket.username);
        if(arrayPlayer[index_old].player1.user==socket.username){
            arrayPlayer[index_old].player1.value=0;
        }
        if(arrayPlayer[index_old].player2.user==socket.username){
            arrayPlayer[index_old].player2.value=0;
        }
        io.sockets.in(socket.room).emit('updateplayer',arrayPlayer[index_old].player1.value,arrayPlayer[index_old].player2.value );
    });
    socket.on("restart", function () {
        io.sockets.in(socket.room).emit('restart');
    });
    socket.on('switchRoom', function (newroom) {
        var index_old = rooms.indexOf(socket.room);
        var index_new = rooms.indexOf(newroom);
        player1 = arrayPlayer[index_new].player1.value;
        player2 = arrayPlayer[index_new].player2.value;
        console.log(amount_member);
        console.log(amount_member[index_new]);
        if (amount_member[index_new] >= 2 && amount_member[index_new] <= 10) {
            socket.emit("error_connect_room");
        }
        else {
            amount_member[index_old] = amount_member[index_old] - 1;
            amount_member[index_new] = amount_member[index_new] + 1;
            if (amount_member[index_old] == 0 && amount_member.length > 1) {
                amount_member.splice(index_old, 1);
                rooms.splice(index_old, 1);
                arrayPlayer.splice(index_old,1);
            }
            //socket.emit('removeRoom',amount_member);
            if(arrayPlayer[index_old].player1.user==socket.username){
                arrayPlayer[index_old].player1.value=0;
            }
            if(arrayPlayer[index_old].player2.user==socket.username){
                arrayPlayer[index_old].player2.value=0;
            }
            io.sockets.in(socket.room).emit('updateplayer',arrayPlayer[index_old].player1.value,arrayPlayer[index_old].player2.value );
            socket.leave(socket.room);
            socket.join(newroom);
            socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
            socket.room = newroom;
            socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
            socket.emit('updaterooms', rooms, newroom);
            socket.broadcast.emit('updaterooms_server');
            io.sockets.in(socket.room).emit('updateplayer', player1, player2);

        }
    });
    socket.on("updaterooms_server",function(){
        socket.emit('updaterooms', rooms, socket.room);
    })
}
function findIndexRoom(room) {
    return rooms.indexOf(room);
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
io.sockets.on('connection', run);