const app = require("./index");
const http = require("http");
const server = http.createServer(app);


 /**
  * Listen on provided port, on all network interfaces.
  */
 port = 5000;
 server.listen(port,()=>{console.log(`listing on ${port}`)});

 const io = require("socket.io")(server, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
   },
 });
 
 io.on('connection', (socket) => {
  console.log('new client connected');
  socket.emit('connected',null);

  socket.on('login',(data)=>{console.log(data)})
});
 

