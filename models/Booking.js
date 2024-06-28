const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: String ,
    passengerName: String,
    flightNumber: String,
    seatNumber: String,
    departureDate: Date
});

module.exports = mongoose.model('Booking', bookingSchema);