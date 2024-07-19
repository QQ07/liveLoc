// @ts-nocheck
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", (data) => {
    io.emit("user-disconnected", socket.id);
  });
  //   console.log(socket.id);
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(80);
