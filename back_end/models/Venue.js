const mongoose = require('mongoose');

venueSchema = new mongoose.Schema({
    venueName: {
        type: String,
        required: true
    },
    venueLocation: {
        type: String,
        required: true
    },
    venueCapacity: {
        type: Number,
        required: true
    }
});

const venue = mongoose.model('venues', venueSchema);


module.exports = venue;


