const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const port = 8080;
const path = require("path");

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatbot');
}

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
})

//Index Route
app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
})

//new Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//post 
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
    });

    newChat.save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
})