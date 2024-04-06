const dbConnection = require('../config/dbConnection');


class Events {
    // get all events 
    static async getAllEvents() {
        const query = `SELECT * FROM events`;
        try {
            const { rows } = await dbConnection.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // get events by organizer
    static async getEventsByOrganizer(userID) {
        const query = `SELECT * FROM events WHERE organizerid = $1`;
        try {
            const { rows } = await dbConnection.query(query, [userID]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // get events by date
    static async getEventsByDate(date) {
        const query = `SELECT * FROM events WHERE startdatetime = $1`;
        try {
            const { rows } = await dbConnection.query(query, [date]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // get events by name
    static async getEventsByName(eventName) {
        const query = `SELECT * FROM events WHERE eventname = $1`;
        try {
            const { rows } = await dbConnection.query(query, [eventName]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // create an event  
    static async createEvent(eventName, eventDescription, startDateTime, endDateTime, venueID, organizerID) {
        const query = `INSERT INTO events (eventname, eventdescription, startdatetime, enddatetime, venueid, organizerid) VALUES ($1, $2, $3, $4, $5, $6)`;
        try {
            await dbConnection.query(query, [eventName, eventDescription, startDateTime, endDateTime, venueID, organizerID]);
        } catch (error) {
            throw error;
        }
    }

    // update an event 
    static async updateEvent(eventID, eventName, eventDescription, startDateTime, endDateTime, venueID, organizerID) {
        const query = `UPDATE events SET eventname = $1, eventdescription = $2, startdatetime = $3, enddatetime = $4, venueid = $5, organizerid = $6 WHERE eventid = $7`;
        try {
            await dbConnection.query(query, [eventName, eventDescription, startDateTime, endDateTime, venueID, organizerID, eventID]);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Events;
