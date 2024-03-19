const mongoose = require("mongoose");
const Chat = require("./models/chat");

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

let initialChats = [
    {
        from: "Alexandra",
        to: "Michael",
        msg: "Could you please send me the meeting minutes?",
        created_at: new Date()
    },
    {
        from: "Michael",
        to: "Alexandra",
        msg: "Sure thing, I'll send them right over.",
        created_at: new Date()
    },
    {
        from: "Sarah",
        to: "David",
        msg: "Hey, did you get a chance to review the presentation slides?",
        created_at: new Date()
    },
        
    {
        from: "David",
        to: "Sarah",
        msg: "Yes, I did. They look good to me.",
        created_at: new Date()
    },
        
    {
        from: "Jonathan",
        to: "Emily",
        msg: "Emily, could you please confirm the schedule for tomorrow's meeting?",
        created_at: new Date()
    },
]

Chat.insertMany(initialChats);