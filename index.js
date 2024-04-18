const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const path = require("path");
const ExpressError = require("./ExpressError.js")
const port = 8080;

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatbot');
};

main()
.then(() => {
    console.log("Connection Successfull");
})
.catch((err) => {
    console.log(err);
});

//Root
app.get("/", (req, res) => {
    res.send(`Root Worlking on port ${port}`)
});

//Index Route
app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

//new Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//post 
app.post("/chats", async(req, res, next) => {
    try{
        let { from, to, msg } = req.body;
        let newChat = new Chat({
            from: from,
            msg: msg,
            to: to,
            created_at: new Date(),
        });
        await newChat.save()
        res.redirect("/chats");
    } catch(err) {
        next(err);
    } 
});

//Edit Route
app.get("/chats/:id/edit", async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id); 
        res.render("edit.ejs", { chat });
    } catch(err) {
        next(err);
    }
});

//Show route 
app.get("/chats/:id", async(req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);  
        if(!chat ) {
            next(new ExpressError(404, "Chat not found"));  
        }
        res.render("show.ejs", { chat }); 
    } catch(err) {
        next(err);
    }
});

//Put Route
app.put("/chats/:id",async (req, res) => {
    let { id } = req.params;
    let newMsg = req.body.msg;
    console.log(newMsg);    
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//Delte Route
app.delete("/chats/:id",async (req, res) => {
    let { id } = req.params;
    let DeletedChat =await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

//Custom Error Middleware
app.use((err, req, res, next) => {
    let {status = 500, message = "Something Went Wrong!"}  = err;
    res.status(status).send(message);
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});