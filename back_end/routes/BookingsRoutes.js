const router = require('express').Router();
const auth = require('../middleware/UserAuth');
const Booking = require('../models/Bookings');
const Event = require('../models/Events');


router.post('/createBooking', auth, async (req, res) => {
    // const { EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus } = req.body; 
    try{
        let { EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus } = req.body;
        BookingDateTime = new Date(BookingDateTime);
        const booking = new Booking({ eventID: EventID, attendeeID: AttendeeID, ticketID: TicketID, bookingDateTime: BookingDateTime, paymentStatus: PaymentStatus });
        await booking.save();

        // also need to decrement the ticket quantity
        const event = await Event.findById(EventID);
        const ticket = event.tickets.id(TicketID);
        ticket.ticketAvailableQuantity -= 1;
        await event.save();
        
        res.json({ message: 'Booking created successfully' });
        // await Booking.createBooking(EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus);
        // res.json({ message: 'Booking created successfully' });
    }catch(error) {
        res.status(500).json({ error });
        console.log(error);
    }

    
})

router.delete('/deleteBooking/:BookingID', auth, async (req, res) => {
    const BookingID = req.params.BookingID;
    console.log("Booking ID is", BookingID);
    try {
        const booking = await Booking.deleteBooking(BookingID);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/getAttendees/:EventID', auth, async (req, res) => {
    const EventID = req.params.EventID;
    try {
        const attendees = await Booking.getAttendees(EventID);
        res.json(attendees);
    } catch (error) {
        res.status(500).json({ error });
    }
})


router.get('/getAttendeesCount/:EventID', auth, async (req, res) => {
    const EventID = req.params.EventID;
    try {
        console.log("Event ID is, Helloo: ", EventID);
        const attendeesCount = await Booking.getAttendeesCount(EventID);
        res.json(attendeesCount);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/getBookingsCount/:EventID', auth, async (req, res) => {
    const EventID = req.params.EventID;
    try {
        const bookings = await Booking.getBookingCount(EventID);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;