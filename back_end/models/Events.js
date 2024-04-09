const dbConnection = require('../config/dbConnection');


class Events {


    // EventName
    // EventDescription
    // EventDate
    // StartTime
    // EndTime
    // VenueID (Foreign Key referencing Venues table)
    // OrganizerID (Foreign Key referencing Users table)

    // get all events
    static async getAllEvents() {
        const query = `SELECT * FROM events`;
        try {
            const rows = await dbConnection.query(query);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // get events by organizer
    static async getEventsByOrganizer(OrganizerID) {
        const query = `SELECT * FROM events WHERE organizerid = $1`;
        try {
            const rows = await dbConnection.query(query, [OrganizerID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // get event like name
    static async getEventsByName(EventName) {
        const query = `SELECT * FROM events WHERE eventname LIKE $1`;
        try {
            const rows = await dbConnection.query(query, ['%' + EventName + '%']);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // get events by date
    static async getEventsByDate(EventDate) {
        const query = `SELECT * FROM events WHERE eventdate = $1`;
        try {
            const rows = await dbConnection.query(query, [EventDate]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }


    // create an event
    static async createEvent(EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID) {
        console.log("Event details is" ,EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID);
        const query = `INSERT INTO events (eventname, eventdescription, eventdate, starttime, endtime, venueid, organizerid) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        try {
            const result = await dbConnection.query(query, [EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID]);
            const eventId = await result[0].insertId;
            console.log(eventId, "eventid")
            return eventId;
        } catch (error) {
            console.log(error, "shit failed")
            throw error;
        }
    }
}

module.exports = Events;
