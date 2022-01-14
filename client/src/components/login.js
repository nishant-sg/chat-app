import "../App.css";
import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../config.json";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);

  const PostData = async (e) => {
    e.preventDefault();
    console.log("posting");
    try {
      console.log({
        email,
        password,
      });
      const res = await axios.post(`${config.server}api/login/`, {
        email,
        password,
      });
      //const data = await res.json();
      console.log(res);
      if (res.status === 200) {
        console.log("success");
        const { token, user } = res.data;
        console.log("Successfully Signed in");
        console.log(res);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("login successful");   
        if(user.role === "admin") {
          navigate("/admin");
        }else{
          navigate("/chat");
        }
      } else {
        console.log("problems");
      }
     
    }catch (error) {
        if (error.response.status === 403) {
            alert(error.response.data.status);
          } else {
            console.log(error.response);
          }
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>

      <form onSubmit={PostData}>
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" placeholder="Login" />
      </form>
    </div>
  );
}

export default Login;
