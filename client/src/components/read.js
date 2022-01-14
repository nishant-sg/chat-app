import "../App.css";
import { useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import Login from "./login";

function Read(props) {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(false);
  const [data, setData] = useState("");
  //console.log(data);

  const SubmitData = async (e) => {
    e.preventDefault();
    try {
      console.log("data", { email });
      const res = await axios.post(
        `${config.server}api/admin/${props.name}/read`,
        { email }
      );

      console.log("user", res.data.user);
      setData(res.data.user);
      setEmail(null);
      if (res.status === 200) {
        
        console.log("success", value);
        //alert("User Created successfully");
      } else if (res.status === 234) {
        alert("User already Exists");
        console.log("problems");
      }
    } catch (error) {
      console.log(" error", error);
    }
  };

 
  return (
    <div className="App">
      <h3>Read Page</h3>
      <div>
        <form onSubmit={SubmitData}>
          <input
            placeholder="enter email"
            value={email}
            onChange={(a) => {
              setEmail(a.target.value);
            }}
          />
          <input type="submit" />
        </form>
      </div>
      <div>
                {Object.entries(data).map(([k,v])=>{
                    return <p >{k} -- {v}</p>
                })}
            </div>
    </div>
  );
}

export default Read;
