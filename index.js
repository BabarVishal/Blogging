const express = require("express");
const path = require("path");
const app = express();
const Userrouter = require("./routes/user.router")
const BlogRoute = require("./routes/blog.routes")
const mongoose = require("mongoose");
const cookiepaser = require("cookie-parser");
const { checkForauthenticationCookie } = require("./middleware/authentication");
const Blog = require("./models/blog.model")
const PORT = 8000

//DbConection
mongoose.connect("mongodb://127.0.0.1:27017/Blogify")
.then(() => console.log("MongoDb Conected!"))
.catch((err) => console.log("mongoDb Disconected!", err))

//middleware
app.use(express.urlencoded({extended: false}));
app.use(cookiepaser());
app.use(checkForauthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))

//Frentend.....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res)=>{
  const allBlogs = await Blog.find({});
  return res.render("home",{
    user: req.user,
    blogs: allBlogs,
  });
})

app.use("/user", Userrouter);
app.use("/Blog", BlogRoute);

app.listen(PORT, ()=> console.log("server stated!"));