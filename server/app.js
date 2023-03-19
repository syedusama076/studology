const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload');
const CookiesParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");

// Connect ENV File
dotenv.config({ path: './config.env' });
// Database connection with MongoDB Atlas
require('./db/conn');
// To Connect Frontend with Backend and Get Data in JSON format
app.use(express.json());
app.use(cors());
app.use(CookiesParser());
app.use(fileupload(
    {
        useTempFiles: true
    }
));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// const corsOptions = {
//     origin: true, //included origin as true
//     credentials: true, //included credentials as true
// };
// app.use(cors(corsOptions));



// link the router files
app.use(require('./router/auth'));


// Define the port of the server
// const PORT = process.env.PORT;
// app.listen(PORT);
const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});


const emailToSocketMappping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
    console.log("connection");
    socket.on("join-room", (data) => {
        console.log("new connection");
        const { roomId, emailId } = data;
        console.log("user", emailId, "joined room", roomId);
        emailToSocketMappping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId);
        console.log(
            emailToSocketMappping, 'emailToSocketMappping',
            socketToEmailMapping, "socketToEmailMapping"
        );
        socket.join(roomId);
        socket.emit("joined-room", { roomId });
        socket.broadcast.to(roomId).emit("user-joined", { emailId });
    });

    socket.on("call-user", (data) => {
        console.log("call");
        const { emailId, offer } = data;
        const fromEmail = socketToEmailMapping.get(socket.id);
        // console.log(fromEmail, 'fromEmail');
        // console.log(socket.id, 'socket id');
        // console.log(offer);
        const socketId = emailToSocketMappping.get(emailId);
        console.log(socketId, 'socket id mapping');
        console.log(fromEmail, 'email mapping');
        socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
    });

    socket.on("call-accepted", (data) => {

        console.log('call accepted data', data);
        const { emailId, ans } = data;
        const socketId = emailToSocketMappping.get(emailId);
        socket.to(socketId).emit("call-accepted", { ans });
    });

});

io.listen(8001);