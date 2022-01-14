import "../App.css";
import { useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import Create from "./create";
import Read from "./read";
import Update from "./update";

function EditDatabase(props) {
  const [apiCall,setApiCall] = useState("");
  const [fields,setFields] = useState({});

  useLayoutEffect(()=>{
    if(props.name==="user"){
      setApiCall(props.name);
      setFields({
        "name":"default", 
        "email":"a@mnit.ac.in",
        "rollNumber":"1234abc1234",
        "role":"fresher",
        "college":"MNIT",
        "password":"default_password"
      });
    }else if(props.name==="rooms"){

    }
    
  },[]);

  console.log("fields", fields);
  return (
    <div className="App">
        <h3>Only admins can see this</h3>
        <div>
          <h1>this is the area to display</h1>
          <Routes>
            <Route path="/create" exact element={<Create name={apiCall} fields={fields}/>} />
            <Route path="/read" exact element={<Read name={apiCall}/>} />
            <Route path="/update" exact element={<Update name={apiCall}/>} />
        </Routes>	</div>
        <h3>{props.name}</h3>
    </div>
  );
}

export default EditDatabase;
