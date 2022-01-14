import "../App.css";
import { useState, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import EditDatabase from "./editdatabase";


function Admin() {
  const [isauthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user"));

  const checkIsValidUser = async () => {
    console.log("posting");

    const res = await axios.post(
      `${config.server}api/admin`,
      {
        user: user,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      setIsAuthorized(true);
    } else if (res.status === 234) {
      alert("this page is for admins only");
      navigate("/login");
    }
  };

  useLayoutEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    checkIsValidUser();
  }, []);

  return (
    <div className="App">
      <h1>hi</h1>
      {isauthorized && (
        <div className="admin">
        <div className="admin-left">
          <a href= 'http://localhost:3000/admin/user'><button className="btn">Users</button></a><br/>
          <a href= 'http://localhost:3000/admin/room'><button className="btn">Rooms</button></a><br/>
          <a href= 'http://localhost:3000/admin/messages'><button className="btn">Messages</button></a>
          
        </div>
        <div className="admin-right">
        <Routes>
          <Route path="/user/*" exact element={<EditDatabase name="user"/>} />
          <Route path="/room/*" exact element={<EditDatabase name="room"/>} />
          <Route path="/messages/*" exact element={<EditDatabase name="messages"/>} />
      </Routes>	
        </div>
      </div>
      )}
    </div>
  );
}

export default Admin;
