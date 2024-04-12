const router = require('express').Router();
const Ticket = require('../models/Ticket');
const auth = require('../middleware/UserAuth');


router.get('/gettickets/:eventID', auth, async (req, res) => {
    const eventID = req.params.eventID;
    try {
        const tickets = await Ticket.getTicketsByEvent(eventID);
        console.log("Tickets are", tickets);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error });
    }
}
)

router.get('/getTicketCount/:eventID', auth, async (req, res) => {
    const eventID = req.params.eventID;
    try {
        const ticketCount = await Ticket.getTicketCount(eventID);
        console.log("Ticket count is", ticketCount);
        res.json(ticketCount);
    } catch (error) {
        res.status(500).json({ error });
    }
}
)

module.exports = router;