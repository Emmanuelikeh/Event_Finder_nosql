const router = require('express').Router();
const auth = require('../middleware/UserAuth');
const User = require('../models/User');




router.post('/login', async (req, res) => {

    try {
        let { email, password, isorganizer } = req.body;
        if(isorganizer === 'organizer') {
            isorganizer = true;
        }
        else {
            isorganizer = false;
        }
        console.log(email, password, isorganizer);
        const user = await User.getUserByCredentials(email, password, isorganizer);
        const token = await user.generateToken();
        res.status(200).json({ user, token });
    } catch (err) {
        console.log(`Error in login: ${err}`);
        res.status(401).json({ error: err });
    }
})

router.post('/signup', async (req, res) => {
    try {
        let { username, email, password, isorganizer } = req.body;
        if(isorganizer === 'organizer') {
            isorganizer = true;
        }
        else {
            isorganizer = false;
        }
        console.log(email, password, isorganizer);
        const existingUser = await User.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
           return res.status(400).json({ error: 'User already exists' });
           console.log("User already exists");
        }

        const user = new User({ username, email, password, isorganizer });
        console.log(user);
        await user.save();
        console.log("User created successfully");
        res.json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
})

// get all organizers
router.get('/organizers', auth, async (req, res) => {
    console.log("Get all organizers");
    try {
        const organizers = await User.findOrganizers();
        console.log(organizers);
        res.json(organizers);
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;