import "../App.css";
import { useState, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import Login from "./login";

function Create(props) {
  const data = {};
  let a = null;
  //console.log(data);

  const SubmitData = async (e)=>{
      e.preventDefault();
      console.log(data);
      try {
        console.log("data",data);
        const res = await axios.post(`${config.server}api/admin/${props.name}/add`, data);
        
        console.log(data);
        if (res.status === 200) {
          console.log("success");
          a = null
          alert("User Created successfully");  
        } else if (res.status === 234){

          alert("User already Exists"); 
          console.log("problems");
        }
       
      }catch (error) {
          console.log(" error");
      }
  }
  return (
    <div className="App">
      <h3>Create Page</h3>
      <div>
        <form onSubmit={SubmitData}>
          {Object.entries(props.fields).map(([key, value]) => {
            data[key]=value
            return (
              <div key={key}>
                <label>{key}</label> 
                <input key={key} value={a} placeholder={value} onChange={(a)=>{data[key]=a.target.value}}/>
              </div>
            );
          })}
          <input type="submit"/>
        </form>
      </div>
      <h1>hello</h1>
    </div>
  );
}

export default Create;
