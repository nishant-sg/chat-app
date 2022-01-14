//requireimport connectDB from './config/db.js';
const { connectDB } = require('./config/db');
const express = require('express');
const { signup,login } = require('./controllers/auth');
const { requireSignin,userMiddleware,adminMiddleware } = require('./middleware')
const { createUser } = require('./controllers/admin/create');
const { userFields } = require('./controllers/admin/fields');
const { readUser } = require('./controllers/admin/read');

require("dotenv").config();

connectDB()

const app = express()

const PORT = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/api.js"));

app.post("/api/signup",signup);
app.post("/api/login",login,(req, res) => {console.log("signed in")});

app.post("/api/chat",requireSignin,userMiddleware,(req,res) => {
    res.send("user signed in");
})

app.post("/api/admin",requireSignin,adminMiddleware,(req,res) => {

    return res.status(200).json({ error: "no error" });
});

app.post("/api/admin/user/add",createUser);

app.post("/api/admin/user/read",readUser);
module.exports = app;

//app.listen(PORT,()=>{
//    console.log(`port-${PORT}`)
///});