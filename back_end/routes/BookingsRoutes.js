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
        console.log(req.body, "Here , testing");
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
        console.log(error);
    }
})

router.get('/getAttendees/:EventID', auth, async (req, res) => {
    try {
      const eventID = req.params.EventID;
  
      // Get all the bookings for the specified event
      const bookings = await Booking.find({
        eventID: eventID
      })
      .populate('attendeeID', 'username email')
      .populate('ticketID', 'ticketType');
  
      // Extract the attendee and ticket information from the bookings
      const attendees = bookings.map(booking => ({
        name: booking.attendeeID.username,
        email: booking.attendeeID.email,
        ticketType: booking.ticketID.ticketType
      }));
  
      res.status(200).json(attendees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/getAttendeesCount/:EventID', auth, async (req, res) => {
    const EventID = req.params.EventID;
    // get date and  count of attendees for an event
    try{
        const attendeesCounts = await Booking.aggregate([
            {
              $match: {
                eventID: mongoose.Types.ObjectId(eventID)
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
      
          res.status(200).json(attendeesCounts);
    }
    catch(error) {
        res.status(500).json({ error });
    }    
})

router.get('/getTicketTypeCounts/:EventID', auth, async (req, res) => {
    try {
      const eventID = req.params.EventID;
  
      // Get the count of each ticket type for the event
      const ticketTypeCounts = await Booking.aggregate([
        {
          $match: {
            eventID: mongoose.Types.ObjectId(eventID)
          }
        },
        {
          $lookup: {
            from: 'events',
            localField: 'eventID',
            foreignField: '_id',
            as: 'event'
          }
        },
        {
          $unwind: '$event'
        },
        {
          $unwind: '$event.tickets'
        },
        {
          $group: {
            _id: '$event.tickets.ticketType',
            count: { $count: {} }
          }
        },
        {
          $project: {
            _id: 0,
            ticketType: '$_id',
            count: '$count'
          }
        }
      ]);
  
      res.status(200).json(ticketTypeCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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