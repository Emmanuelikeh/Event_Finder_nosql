const router = require('express').Router();
const venue = require('../models/Venue');


router.get('/', async (req, res) => {
    try{
        const venues = await venue.find();
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const venue = await venue.findById(id);
        res.json(venue);
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;