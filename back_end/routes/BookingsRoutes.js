const router = require('express').Router();
const auth = require('../middleware/UserAuth');
const Booking = require('../models/Bookings');
const Event = require('../models/Events');
const Venue = require('../models/Venue');


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

router.get('/registered/:userID', auth, async (req, res) => {
    const userID = req.params.userID;
    console.log("User ID is", userID);
    try{
        let bookings = await Booking.find({ attendeeID: userID }).populate('eventID');
        // GET THE VENUE INFO
        const venueID = bookings.map(booking => booking.eventID.venueID);
        const venueInfo = await Venue.findById(venueID);

        // bokkign should now only contain, eventID, bookingDateTime, paymentStatus, venueInfo and ticketId and the bookign ID
        bookings = bookings.map(booking => {
            return {
                bookingID: booking._id,
                eventID: booking.eventID,
                bookingDateTime: booking.bookingDateTime,
                paymentStatus: booking.paymentStatus,
                venueInfo: venueInfo,
                ticketID: booking.ticketID
            }
        })
        
        console.log(bookings);
        res.json(bookings);
    }
    catch(error) {
        res.status(500).json({ error });
    }
})

router.delete('/deleteBooking', auth, async (req, res) => {
    // body: JSON.stringify({ bookingID, ticketID, eventID }),
    try{
        // { bookingID:bookingID, ticketID:ticketID, eventID:eventID}
        const { bookingID, ticketID, eventID } = req.body;
        console.log(req.body);
        // also need to increment the ticket quantity
        const event = await Event.findById(eventID);
        const ticket = event.tickets.id(ticketID);
        ticket.ticketAvailableQuantity += 1;
        await event.save();
        res.json({ message: 'Booking deleted successfully' });
    }
    catch(error) {
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