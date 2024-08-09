const express = require("express");
const path = require("path");
const app = express();
const Userrouter = require("./routes/user.router")
const mongoose = require("mongoose");
const PORT = 8000

//DbConection
mongoose.connect("mongodb://127.0.0.1:27017/Blogify")
.then(() => console.log("MongoDb Conected!"))
.catch((err) => console.log("mongoDb Disconected!", err))

//middleware
app.use(express.urlencoded({extended: false}));

//Frentend.....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res)=>{
  return res.render("home");
})

app.use("/user", Userrouter);

app.listen(PORT, ()=> console.log("server stated!"));