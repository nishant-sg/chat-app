import "../App.css";
import { useState,useEffect} from "react";
import axios from "axios";
import config from "../config.json";
import ChatRoom from "./chatRoom";

function Chat() {
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user.name);
  const checkLogin = async () => {
    const res = await axios.post(
      `${config.server}api/chat`,
      {
        roomId: "clickedRoomId",
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
      }
    );
    if (res.status === 400){
        console.log("nah")
    }
    console.log(res);
  };

  checkLogin();
  
  if (token === null) {
     alert("required to login to view data");
    //history.push("/");
  }

  return (
    <div className="App">
      <ChatRoom name={user.name}/>
      <h3>{user.name} </h3>
    </div>
  );
}

export default Chat;
