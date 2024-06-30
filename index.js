const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const bookingRouter = require('./routes/BookingRoutes.js');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socket(server);

app.use(bodyParser.json());



const dotenv = require(`dotenv`)
const mongoose = require('mongoose')

dotenv.config({path : `.env`})

app.use('/bookings', bookingRouter);

/*MONGODB CONNECTION START*/
const MONGO_URL = process.env.MONGO_URL ;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error', (err) => {
    console.log("Error Connecting to Database", err)
})
/*MONGODB CONNECTION END*/

/* SOCKET.IO CONNECTION STARTS*/
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.set('socketio', io);
/* SOCKET.IO CONNECTION ENDS*/

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});