var http = require('http'),
 
    socketIO = require('socket.io'),
 
    port = process.env.PORT || 3000,
 
    ip = process.env.IP || '127.0.0.1',
 
    server = http.createServer().listen(port, ip, function(){
        console.log('Socket.IO server started at %s:%s!', ip, port);
    }),
 
    io = socketIO.listen(server);
 
io.set('match origin protocol', true);
io.set('origins', '*:*');
var run = function(socket){
    // Socket process here!!!
    //socket.emit('greeting', 'Hello from Socket.IO server');
	socket.on('user-join', function(data){
        console.log('User %s have joined', data);
		socket.broadcast.emit('new-user', data);
    });
	socket.on('user-insert', function(data){
		console.log('User %s focus', data);
		socket.broadcast.emit('user-insert', data);
	});
	socket.on('user-out', function(data){
		console.log('User %s focusout', data);
		socket.broadcast.emit('user-out', data);
	});
}

 
io.sockets.on('connection', run);