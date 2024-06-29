const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

/*  NEW FLIGHT BOOKING ROUTE STARTS */
router.post('/new-booking', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

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


module.exports = router;