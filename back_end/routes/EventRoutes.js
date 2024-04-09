const router = require('express').Router();
const Event = require('../models/Events');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/UserAuth');


router.post('/create', auth, async (req, res) => {
    console.log("create event");
    console.log(req.body);
    const { eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueId, organizerID,  ticketOptions } = req.body;
    console.log(eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueId, organizerID, ticketOptions);

    try {
        const eventId = await Event.createEvent(eventName, eventDescription, eventDate, eventStartTime, eventEndTime, venueId, organizerID);
        console.log("Event ID is", eventId);
        for (let i = 0; i < ticketOptions.length; i++) {
            // ticketOptions: [{ id: 'free', name: 'Free', description: 'Free Ticket', price: 0, quantity: 0, error: false }],
            const { id, name, description, price, quantity, error } = ticketOptions[i];
            console.log("Ticket details are", id, name, description, price, quantity, error);
            await Ticket.createTicket(eventId, name, description, price, quantity);
        }
        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
})


// get all events
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get events by organizer
router.get('/getevents/:userID', auth, async (req, res) => {
    const OrganizerID = req.params.userID;
    console.log("Organizer ID is", OrganizerID)
    try {
        console.log("Organizer ID is", OrganizerID)
        const events = await Event.getEventsByOrganizer(OrganizerID);
        res.json(events);   
    } catch (error) {
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
    const {EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID } = req.body;
    try {
        await Event.updateEvent(event_id, EventDesciption, EventDate, StartTime, EndTime, VenueID, OrganizerID);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;



