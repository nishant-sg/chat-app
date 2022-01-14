import { useEffect, useState } from "react";
import socketClient from "socket.io-client";

function ChatRoom(props) {
    const [res,setRes] = useState("not updated");
    const socketLink = "http://localhost:5000/";
    let socket;


    useEffect(() => {
        socket = socketClient(socketLink);
        console.log("connected  for sure",socket);
        socket.on('connected', () => {
          console.log(`I'm connected with the back-end`);
          socket.emit("login",props.name);
          setRes("connected")
        });
    })
    
    return (
      <div className="App">
        {<h1>Chatroom Page</h1>}
        <h3>{res}</h3>
      </div>
    );
  }
  
  export default ChatRoom;