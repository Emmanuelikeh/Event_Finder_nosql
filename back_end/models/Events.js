const dbConnection = require('../config/dbConnection');


class Events {
    static async getAllEvents() {
        const query = `
          SELECT
            e.EventID,
            e.EventName,
            e.EventDescription,
            e.EventDate,
            e.StartTime,
            e.EndTime,
            u.Username AS Organizer,
            v.VenueName,
            v.Location,
            v.Capacity
          FROM
            Events e
          JOIN
            Users u ON e.OrganizerID = u.UserID
          JOIN
            Venues v ON e.VenueID = v.VenueID
        `;

        try {
            const rows = await dbConnection.query(query);
            console.log(rows);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getAvailableEvents() {
        // similar to the above function, but only returns events that have not yet occurred i.e does not pass the current date and time
        const query = `
          SELECT
            e.EventID,
            e.EventName,
            e.EventDescription,
            e.EventDate,
            e.StartTime,
            e.EndTime,
            u.Username AS Organizer,
            v.VenueName,
            v.Location,
            v.Capacity
          FROM
            Events e
          JOIN
            Users u ON e.OrganizerID = u.UserID
          JOIN
            Venues v ON e.VenueID = v.VenueID
          WHERE
            e.EventDate >= CURDATE()
        `;

        try {
            const rows = await dbConnection.query(query);
            console.log(rows);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // get all registered events
    static async getAllRegisteredEvents(UserID) {
        const query = `
        SELECT 
    e.EventName,
    e.EventDescription,
    e.EventDate,
    e.StartTime,
    e.EndTime,
    v.VenueName,
    v.Location,
    v.Capacity
FROM
    Events e
    JOIN Venues v ON e.VenueID = v.VenueID
    JOIN Bookings b ON e.EventID = b.EventID
    JOIN Users u ON b.AttendeeID = u.UserID
WHERE
    u.UserID = 3;
        `
        try {
            const rows = await dbConnection.query(query);
            console.log(rows[0]);
            return rows[0];
        }
        catch (error) {
            throw error;
        }
    }

    // get events by organizer
    static async getEventsByOrganizer(OrganizerID) {
        console.log("Organizer ID is, UNO")
        const query = `
          SELECT
            e.EventID,
            e.EventName,
            e.EventDescription,
            e.EventDate,
            e.StartTime,
            e.EndTime,
            v.VenueName,
            v.Location,
            v.Capacity
          FROM
            Events e
          JOIN
            Venues v ON e.VenueID = v.VenueID
          WHERE
            e.OrganizerID = ${OrganizerID}
        `;
        try {
            const rows = await dbConnection.query(query);
            console.log(rows);
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
        console.log("Event details is", EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID);
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
