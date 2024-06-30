const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

/*  NEW FLIGHT BOOKING ROUTE STARTS */
router.post('/new-booking', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

         // Socket.io changes request
        const io = req.app.get('socketio');
        io.emit('BookingCreated', booking);

        res.status(201).send({
            success: true,
            booking
        });

    } catch (err) {
        res.status(400).send(err);
    }
});
/*  NEW FLIGHT BOOKING ROUTE ENDS */

/*  GETTING ALL FLIGHT BOOKINGS ROUTE STARTS */
router.get('/all-bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (err) {
        res.status(500).send(err);
    }
});
/*  GETTING ALL FLIGHT BOOKINGS ROUTE ENDS */

/*  UPDATE FLIGHT BOOKINGS ROUTE STARTS */
router.put('/update/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) 
            return res.status(404).send();

         // Socket.io changes request
        const io = req.app.get('socketio');
        io.emit('BookingUpdated', booking);

        res.send({
            success: true,
            booking
        });
    } catch (err) {
        res.status(400).send(err);
    }
});
/*  UPDATE FLIGHT BOOKINGS ROUTE ENDS */

/*  DELETE FLIGHT BOOKINGS ROUTE STARTS */
router.delete('/delete/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).send();

        // Socket.io changes request
        const io = req.app.get('socketio');
        io.emit('BookingDeleted', booking);

        res.send({
            success: true,
            booking
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
/*  DELETE FLIGHT BOOKINGS ROUTE ENDS */

module.exports = router;