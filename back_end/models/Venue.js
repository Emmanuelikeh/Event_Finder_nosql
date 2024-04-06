const dbConnection = require('../config/dbConnection');
class Venue {

    // Venues Table: (Hard Coded)
    // VenueID (Primary Key)
    // VenueName
    // Location
    // Capacity


    // get all venues
    static async getAllVenues() {
        const query = `SELECT * FROM venues`;
        try {
            const { rows } = await dbConnection.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

}