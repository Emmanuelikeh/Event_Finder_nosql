const router = require('express').Router();
const Event = require('../models/Events');
const Booking = require('../models/Bookings');
const auth = require('../middleware/UserAuth');

router.post('/create', auth, async (req, res) => {

    try {
        let { eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueId, organizerID, ticketOptions } = req.body;
        // convert the date strings to date objects
        eventDate = new Date(eventDate);

        eventStartTime = new Date(`${eventDate.toDateString()} ${eventStartTime}`);
        eventEndTime = new Date(`${eventDate.toDateString()} ${eventEndTime}`);
        // remove the id and error from the ticketOptions
        ticketOptions = ticketOptions.map(ticket => {
            delete ticket.id;
            delete ticket.error;
            return ticket;
        });

        // modify the json key to match the schema
        ticketOptions = ticketOptions.map(ticket => {
            ticket.ticketType = ticket.name;
            ticket.ticketDescription = ticket.description;
            ticket.ticketPrice = ticket.price;
            ticket.ticketAvailableQuantity = ticket.quantity;
            delete ticket.name;
            delete ticket.description;
            delete ticket.price;
            delete ticket.quantity;
            return ticket;
        });

        console.log("Ticket options are", ticketOptions);
        const event = new Event({ eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueID: venueId, organizerID, tickets: ticketOptions });
        await event.save();
        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    }
})


// get at most three events by and organizer
router.get('/getThreeEvents/:organizerID', auth, async (req, res) => {
    const organizerID = req.params.organizerID;

    try {
        const events = await Event.getEventsByOrganizer(organizerID);
        // console.log(events.slice(0, 3));
        res.json(events.slice(0, 3));
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get the total number of events and the tota number of people that have attending a event for a specific organizer

router.get('/getTotalEventsAndAttendees/:organizerID', auth, async (req, res) => {
    const organizerID = req.params.organizerID;
    // console.log(organizerID);
    try {
        const events = await Event.getEventsByOrganizer(organizerID);
        const totalEvents = events.length;
        // get the total number of attendees for all the organizers events
        const totalAttendees = await Booking.aggregate([
            {
              $match: {
                eventID: { $in: events.map(event => event._id) }
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
                _id: 0,
                count: 1
              }
            }
          ]);
      
          const totalAttendeesCount = totalAttendees[0]?.count ?? 0;

        //   console.log(totalAttendeesCount, totalEvents);
          res.json({ totalEvents, totalAttendees: totalAttendeesCount });
    } catch (error) {
        res.status(500).json({ error });
    }
})





// get all events
router.get('/getAvailableEvents/:userID', auth, async (req, res) => {
    const userID = req.params.userID;
    try {
        const events = await Event.getAvailableEvents(userID);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get all events and return a new  value isregistered if the user has registered for the event
router.get('/getIsRegisteredEvents', auth, async (req, res) => {
    try {
        const userID = req.query.userID;
        const orgID = req.query.orgID;

        console.log(userID, orgID);

        const events = await Event.find({
            organizerID: orgID,
            eventDate: { $gte: new Date() },
          })
            .populate('venueID')
            .populate({
                path: 'organizerID',
                select: 'username email _id',
              });
        const eventsWithRegistration = await Promise.all(
            events.map(async (event) => {
                const booking = await Booking.findOne({
                eventID: event._id,
                attendeeID: userID,
                });
                return {
                ...event.toObject(),
                isRegistered: !!booking,
                };
            })
            );
        res.status(200).json(eventsWithRegistration);
    }
    catch (error) {
        res.status(500).json({ error });
    }
   
});






// get events by organizer
router.get('/getevents/:userID', auth, async (req, res) => {
    const OrganizerID = req.params.userID;
    try {
        // get all evenst by the organizer including the infomation of the venue 
        const events = await Event.getEventsByOrganizer(OrganizerID);
        console.log(events);
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error });
    }
})


// get events by name
router.get('/name/:eventName', auth, async (req, res) => {
    const event_name = req.params.EventName;
    try {
        const events = await Event.getEventsByName(event_name);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get events by date
router.get('/date/:date', auth, async (req, res) => {
    const date = req.params.EventDate;
    try {
        const events = await Event.getEventsByDate(date);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})



// update events
router.put('/:eventID', auth, async (req, res) => {
    const event_id = req.params.EventID;
    const { EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID } = req.body;
    try {
        await Event.updateEvent(event_id, EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;



