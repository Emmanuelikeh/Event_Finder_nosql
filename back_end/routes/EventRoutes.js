const router = require('express').Router();
const Event = require('../models/Events');
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
        const event = new Event({ eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueID:venueId, organizerID, tickets: ticketOptions });
        await event.save();
        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    }
})


// get all events
router.get('/getAvailableEvents/:userID', auth, async (req, res) => {
    const userID = req.params.userID;
    try {
        console.log("Get all events");
        const events = await Event.getAvailableEvents(userID);
        console.log(events);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get all events and return a new  value isregistered if the user has registered for the event
router.get('/getIsRegisteredEvents/:userID', auth, async (req, res) => {
    const userID = req.params.userID;
    console.log("User ID is", userID);
    try {
        console.log("Get all events");
        const events = await Event.getEventsAndCheckIfRegistered(userID);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// get events by organizer
router.get('/getevents/:userID', auth, async (req, res) => {
    const OrganizerID = req.params.userID;
    try{
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

// get registerd events by user
// router.get('/registered/:userID', auth, async (req, res) => {
//     const userID = req.params.userID;
//     console.log("User ID is", userID);
//     try {
//         const events = await Event.getAllRegisteredEvents(userID);
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// })

// update events
router.put('/:eventID', auth, async (req, res) => {
    const event_id = req.params.EventID;
    const {EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID } = req.body;
    try {
        await Event.updateEvent(event_id, EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;



