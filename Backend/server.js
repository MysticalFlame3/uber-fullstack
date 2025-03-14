const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for WebSockets
const io = new Server(server, {
  cors: {
    origin: ["https://cloneubrfullstack.netlify.app"], // Your frontend domain
    methods: ["GET", "POST"],
    credentials: true
  }
});

// WebSocket connection event
io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors({ origin: "https://cloneubrfullstack.netlify.app", credentials: true }));
app.get("/", (req, res) => res.send("Server is running!"));

// Start server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// const http = require('http');
// const app = require('./app');
// const { initializeSocket } = require('./socket');
// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// initializeSocket(server);

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });