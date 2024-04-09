const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/UserAuth');

router.post('/login', async (req, res) => {
    const { email, password, isorganizer } = req.body;
    try {
        const user = await User.login(email, password, isorganizer);
        const token  = User.generateToken(user);
        // pass the user and the token to the client
        res.json({ user, token });
    } catch (err) {
        console.log(`Error in login: ${err}`);
        res.status(401).json({ error: err}); 
    }
})

router.post('/signup', async (req, res) => {
    const { username, email, password, isorganizer } = req.body;
    try {
        await User.signup(username, email, password, isorganizer);
        res.json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err});
    }
})

// get all organizers
router.get('/organizers', auth, async (req, res) => {
    try {
        const organizers = await User.findOrganizers();
        res.json(organizers);
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;