const router = require('express').Router();
const auth = require('../middleware/UserAuth');
const Booking = require('../models/Bookings');
const Event = require('../models/Events');
const Venue = require('../models/Venue');
const mongoose = require('mongoose');


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
    }
})

router.get('/registered/:userID', auth, async (req, res) => {
    const userID = req.params.userID;
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
        // also need to increment the ticket quantity
        const event = await Event.findById(eventID);
        const ticket = event.tickets.id(ticketID);
        ticket.ticketAvailableQuantity += 1;
        await event.save();

        // delete the booking
        await Booking.findByIdAndDelete(bookingID);
        res.json({ message: 'Booking deleted successfully' });
    }
    catch(error) {
        res.status(500).json({ error });
    }
})

router.get('/getAttendees/:EventID', auth, async (req, res) => {
    try {
      const eventID = req.params.EventID;
  
      // Get all the bookings for the specified event
     let bookings = await Booking.find({
        eventID: eventID
      }).populate('attendeeID', 'username email')

      const event = await Event.findById(eventID)

      // get the ticket type for each booking and the booking data shoudl only have the username, email, ticketype
        bookings = bookings.map(booking => {
            const ticket = event.tickets.id(booking.ticketID);
            return {
                username: booking.attendeeID.username,
                email: booking.attendeeID.email,
                ticketType: ticket.ticketType
            }
        })
        res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/getAttendeesCount/:EventID', auth, async (req, res) => {
    const eventID = req.params.EventID;
    // get date and  count of attendees for an event
    try{
        const attendeesCounts = await Booking.aggregate([
            {
              $match: {
                eventID: new mongoose.Types.ObjectId(eventID) 
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$bookingDateTime"
                  }
                },
                count: { $count: {} }
              }
            },
            {
              $project: {
                date: "$_id",
                count: "$count"
              }
            }
          ]);
          // remove the _id field   
            attendeesCounts.forEach(attendee => {
                delete attendee._id;
            });
          res.status(200).json(attendeesCounts); 
    }
    catch(error) {
        res.status(500).json({ error });
    }    
})

router.get('/getTicketTypeCounts/:EventID', auth, async (req, res) => {
    try {
      const eventID = req.params.EventID; 
      // Get the count of each ticket for the event
      const ticketTypeCounts = await Booking.aggregate(
        [
            {
              $match: {
                eventID: new mongoose.Types.ObjectId(eventID)
              }
            },
            {
              $group: {
                _id: "$ticketID",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                ticketID: "$_id",
                count: "$count"
              }
            }
          ]
      );
      // find the event and get the ticket type
        const event = await Event.findById(eventID);
        const tickets = event.tickets;
        ticketTypeCounts.forEach(ticket => {
            const ticketInfo = tickets.id(ticket.ticketID);
            ticket.ticketType = ticketInfo.ticketType;
        });
      res.status(200).json(ticketTypeCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // get the count of bookings for at most three events for an organizer, should return the event name and the count of bookings

router.get('/getThreeEventsBookings/:organizerID', auth, async (req, res) => {
    const organizerID = req.params.organizerID;
console.log(organizerID, "Organizer ID");
    try {
        const events = await Event.getEventsByOrganizer(organizerID);
        const eventIDs = events.map(event => event._id);
        const bookings = await Booking.aggregate([
            {
              $match: {
                eventID: { $in: eventIDs }
              }
            },
            {
              $group: {
                _id: "$eventID",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                eventName: "$_id",
                count: "$count"
              }
            }
          ]);
          bookings.forEach(booking => {
              const event = events.find(event => event._id.equals(booking.eventName));
              booking.eventName = event.eventName;
          });
console.log(bookings);
          res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error });
    }
}
)



router.get('/getBookingsCount/:EventID', auth, async (req, res) => {
    const EventID = req.params.EventID;
    // count the number of bookings for an event
    try{
        const bookingsCount = await Booking.aggregate([
            {
              $match: {
                eventID: new mongoose.Types.ObjectId(EventID)
              }
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                count: "$count"
              }
            }
          ]);
          res.status(200).json(bookingsCount);
    }
    catch(error) {
        res.status(500).json({ error });
    }
})

module.exports = router;