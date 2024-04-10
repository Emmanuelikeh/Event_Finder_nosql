const router = require('express').Router();
const auth = require('../middleware/UserAuth');
const Booking = require('../models/Bookings');


router.post('/createBooking', auth, async (req, res) => {
    const { EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus } = req.body; 
    try {
        const booking = await Booking.createBooking(EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;