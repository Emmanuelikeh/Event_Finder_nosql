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


// class Venue {
    // // get all venues
    // static async getAllVenues() {
    //     const query = `SELECT * FROM venues`;
    //     try {
    //         const rows  = await dbConnection.query(query);
    //         console.log(rows[0], "are the rows");
    //         return rows[0];
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // // get venue by id
    // static async getVenueById(id) {
    //     const query = `SELECT * FROM venues WHERE venueid = $1`;
    //     try {
    //         const rows  = await dbConnection.query(query, [id]);
    //         return rows[0];
    //     } catch (error) {
    //         throw error;
    //     }
    // }

// }

module.exports = venue;