const router = require('express').Router();
const Event = require('../models/Events');
const auth = require('../middleware/UserAuth');

// create an event 
router.post('/createEvent', auth, async (req, res) => {
    const { event_name, event_location, event_date, event_bio, seating_capacity, available_seating } = req.body;
    const user_id = req.user.user_id;
    try {
        await Event.createEvent(event_name, event_location, event_date, event_bio, user_id, seating_capacity, available_seating);
        res.json({ message: 'Event created successfully' });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


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
router.get('/:userID', auth, async (req, res) => {
    const user_id = req.params.userID;
    try {
        const events = await Event.getEventsByOrganizer(user_id);
        res.json(events);   
    } catch (error) {
        res.status(500).json({ error });
    }
})


// get events by name
router.get('/name/:eventName', auth, async (req, res) => {
    const event_name = req.params.eventName;
    try {
        const events = await Event.getEventsByName(event_name);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// get events by date
router.get('/date/:date', auth, async (req, res) => {
    const date = req.params.date;
    try {
        const events = await Event.getEventsByDate(date);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// update events
router.put('/:eventID', auth, async (req, res) => {
    const event_id = req.params.eventID;
    const { event_name, event_location, event_date, event_bio, seating_capacity, available_seating } = req.body;
    try {
        await Event.updateEvent(event_id, event_name, event_location, event_date, event_bio, seating_capacity, available_seating);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;



