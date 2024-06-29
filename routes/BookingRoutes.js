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


module.exports = router;