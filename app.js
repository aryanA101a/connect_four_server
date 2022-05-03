const { Server } = require("socket.io");
const { makeid } = require("./utils");
const io = new Server();


const state={};
const clientRooms={}


io.on('connection', (client) => {
  console.log('a user connected');

  client.on('newGame',handleNewGame);
  client.on('joinGame',handleJoinGame);

  function handleJoinGame(roomName){
    const room=io.sockets.adapter.rooms.get(roomName);
    // let allUsers;
    
    // if(room){
    //   allUsers=room.sockets;
    // }
    console.log(room);
    let numClients=0;
    if(room){
      numClients=room.size;
    }
    
    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }
    
    clientRooms[client.id] = roomName;
    
    client.join(roomName);
    client.number = 2;
    client.emit('playerNumber', 2);
    io.to(roomName).emit("startGame");
    console.log(io.sockets.adapter.rooms.get(roomName).size);
    

  }

  function handleNewGame(){
      let roomName=makeid(5);
      clientRooms[client.id]=roomName

      client.emit('gameCode',roomName);

      // state[roomName]=initGame();

      client.join(roomName);
      client.number=1;
      client.emit('playerNumber',1);
  }

});

io.listen(3000);