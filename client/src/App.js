import react from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./components/signup";
import Login from "./components/login";
import Chat from "./components/chat";
import ChatRoom from "./components/chatRoom"
import Admin from './components/admin';

function App() {
  return (
    <div className="App">
      <h1>Communication Channel</h1>
      <div>
			<BrowserRouter>
      <Routes>
				<Route path="/login" exact element={<Login/>} />
				<Route path="/register" exact element={<SignUp/>} />
        <Route path="/admin/*" exact element={<Admin/>} />
				<Route path="/chat" exact element={<Chat/>} />
        <Route path="/chatroom" exact element={<ChatRoom/>} />
        </Routes>	
			</BrowserRouter>
		</div>
    </div>

  );
}

export default App;
