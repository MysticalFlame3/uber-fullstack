const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Enable CORS for HTTP requests
app.use(cors({
    origin: 'https://cloneubrfullstack.netlify.app', // Replace with your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize Socket.io with WebSocket CORS settings
const io = new Server(server, {
    cors: {
        origin: 'https://cloneubrfullstack.netlify.app', // Replace with your frontend's URL
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
