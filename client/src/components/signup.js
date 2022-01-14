import "../App.css";
import { useState } from "react";
import axios from "axios";
import config from "../config.json";

function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    console.log("signup")
  const PostData = async (e) => {
    e.preventDefault();
    // regex for testing email is left
    const regex = RegExp(/^[\w\.]+@(?:mnit|iiitkota).ac.in$/);
    if (!regex.test(email)) {
      // M.toast({ html: "Invalid email. Use College email id", classes: "#c62828 red darken-3 toast-container", displayLength: "5000"});
      alert("Invalid email. Use College email id");
      return;
    }
    if (name.length < 3) {
      // M.toast({ html: "Do no use nick names and enter Full Name", classes: "#c62828 red darken-3" });
      alert("Do no use nick names and enter Full Name");
      return;
    }
    if (password.length < 6) {
      // M.toast({ html: "Password Must be grater than 6 characters", classes: "#c62828 red darken-3" });
      alert("Password Must be grater than or equal 6 characters");
      return;
    }
    console.log("posting");
    try {
      console.log({
        name,
        email,
        password,
      });
      const res = await axios.post(`${config.server}api/signup/`, {
        name,
        email,
        password,
      });
      //const data = await res.json();
      //console.log(data);
      if (res.status === 200) {
        console.log("success");
      } else {
        console.log("problems");
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 422) {
        alert(error.response.data.status);
      } else {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <form onSubmit={PostData}>
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          value={surname}
          type="text"
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <br />
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
        <input type="submit" placeholder="Register" />
      </form>
    </div>
  );
}

export default SignUp;
