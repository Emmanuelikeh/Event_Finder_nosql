const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventStartTime: {
        type: Date,
        required: true
    },
    eventEndTime: {
        type: Date,
        required: true
    },
    venueID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'venues',
        required: true
    },
    organizerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tickets: [{
        ticketType: { type: String, required: true },
        ticketDescription: { type: String, required: true },
        ticketPrice: { type: Number, required: true },
        ticketAvailableQuantity: { type: Number, required: true }
    }]
});

eventSchema.statics.getEventsByOrganizer = async function (OrganizerID) {
    const events = await this.find({ organizerID: OrganizerID }).populate('venueID');
    return events;
}

async function getOrganizerInfo(organizerID) {
    const organizer = await mongoose.model('User').findById(organizerID, 'username email');
    return organizer;
}


eventSchema.statics.getAvailableEvents = async function(userID) {
    // Get all the events the user has already booked
    const userBookings = await mongoose.model('bookings').find({
      attendeeID: userID
    }).distinct('eventID');
  
    const events = await this.find({
      eventDate: { $gte: new Date() },
      _id: { $nin: userBookings } // Exclude the events the user has already booked
    })
    .populate('venueID')
    .select('-__v'); // Exclude the __v field from the result
  
    // Fetch organizer information for each event
    const eventsWithOrganizer = await Promise.all(
      events.map(async (event) => {
        const organizer = await getOrganizerInfo(event.organizerID);
        return { ...event.toObject(), organizer };
      })
    );
  
    return eventsWithOrganizer;
  };

eventSchema.statics.getEventsAndRegistration = async function(userId) {
    const events = await this.find({
      eventDate: { $gte: new Date() }
    })
    .populate('venueID')
    .populate('organizerID');
  
    // Check if the user has booked for each event
    const eventsWithRegistration = await Promise.all(
      events.map(async (event) => {
        const booking = await mongoose.model('Booking').findOne({
          eventID: event._id,
          attendeeID: userId
        });
        return {
          ...event.toObject(),
          isRegistered: !!booking
        };
      })
    );
  
    return eventsWithRegistration;
  };



const event = mongoose.model('events', eventSchema);
module.exports = event;

// const dbConnection = require('../config/dbConnection');

// class Events {
//     static async getAllEvents() {
//         const query = `
//           SELECT
//             e.EventID,
//             e.EventName,
//             e.EventDescription,
//             e.EventDate,
//             e.StartTime,
//             e.EndTime,
//             u.Username AS Organizer,
//             v.VenueName,
//             v.Location,
//             v.Capacity
//           FROM
//             Events e
//           JOIN
//             Users u ON e.OrganizerID = u.UserID
//           JOIN
//             Venues v ON e.VenueID = v.VenueID
//         `;

//         try {
//             const rows = await dbConnection.query(query);
//             console.log(rows);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     }

//     static async getAvailableEvents(userID) {
//         // similar to the above function, but only returns events that have not yet occurred i.e does not pass the current date and time
//         console.log("User ID is", userID)
//         const query = `
//           SELECT
//           e.EventID,
//           e.EventName,
//           e.EventDescription,
//           e.EventDate,
//           e.StartTime,
//           e.EndTime,
//           u.Username AS Organizer,
//           v.VenueName,
//           v.Location,
//           v.Capacity
//       FROM
//           Events e
//           JOIN Users u ON e.OrganizerID = u.UserID
//           JOIN Venues v ON e.VenueID = v.VenueID
//           LEFT JOIN Bookings b ON e.EventID = b.EventID AND b.AttendeeID = ${userID}
//         WHERE
//           e.EventDate >= CURDATE()
//           AND b.BookingID IS NULL
//         `;

//         try {
//             const rows = await dbConnection.query(query);
//             console.log(rows);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     }

//     // get all registered events
//     static async getAllRegisteredEvents(UserID) {
//         const query = `
//         SELECT 
//     e.EventName,
//     e.EventDescription,
//     e.EventDate,
//     e.StartTime,
//     e.EndTime,
//     b.BookingID,
//     v.VenueName,
//     v.Location,
//     v.Capacity
// FROM
//     Events e
//     JOIN Venues v ON e.VenueID = v.VenueID
//     JOIN Bookings b ON e.EventID = b.EventID
//     JOIN Users u ON b.AttendeeID = u.UserID
// WHERE
//     u.UserID = 3;
//         `
//         try {
//             const rows = await dbConnection.query(query);
//             return rows[0];
//         }
//         catch (error) {
//             throw error;
//         }
//     }

//     // get all events and checking if the user, creating a  new value is registered 

//     static async getEventsAndCheckIfRegistered(UserID) {
//         console.log("User ID is", UserID) 
//         const query = `
//         SELECT
//     e.EventID,
//     e.EventName,
//     e.EventDescription,
//     e.EventDate,
//     e.StartTime,
//     e.EndTime,
//     e.VenueID,
//     v.Location,
//     e.OrganizerID,
//     CASE
//         WHEN b.BookingID IS NOT NULL THEN 1
//         ELSE 0
//     END AS isRegistered
// FROM
//     Events e
//     LEFT JOIN Bookings b ON e.EventID = b.EventID AND b.AttendeeID = ${UserID}
//     LEFT JOIN Venues v ON e.VenueID = v.VenueID
//         `
//         try {
//             const rows = await dbConnection.query(query);
//             console.log(rows);
//             return rows[0];
//         }
//         catch (error) {
//             console.log(error)
//             throw error;
//         }
//     }

//     // get events by organizer
//     static async getEventsByOrganizer(OrganizerID) {
//         console.log("Organizer ID is, UNO")
//         const query = `
//           SELECT
//             e.EventID,
//             e.EventName,
//             e.EventDescription,
//             e.EventDate,
//             e.StartTime,
//             e.EndTime,
//             v.VenueName,
//             v.Location,
//             v.Capacity
//           FROM
//             Events e
//           JOIN
//             Venues v ON e.VenueID = v.VenueID
//           WHERE
//             e.OrganizerID = ${OrganizerID}
//         `;
//         try {
//             const rows = await dbConnection.query(query);
//             console.log(rows);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     }

//     // get event like name
//     static async getEventsByName(EventName) {
//         const query = `SELECT * FROM events WHERE eventname LIKE $1`;
//         try {
//             const rows = await dbConnection.query(query, ['%' + EventName + '%']);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     }

//     // get events by date
//     static async getEventsByDate(EventDate) {
//         const query = `SELECT * FROM events WHERE eventdate = $1`;
//         try {
//             const rows = await dbConnection.query(query, [EventDate]);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     }


//     // create an event
//     static async createEvent(EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID) {
//         console.log("Event details is", EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID);
//         const query = `INSERT INTO events (eventname, eventdescription, eventdate, starttime, endtime, venueid, organizerid) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//         try {
//             const result = await dbConnection.query(query, [EventName, EventDescription, EventDate, StartTime, EndTime, VenueID, OrganizerID]);
//             const eventId = await result[0].insertId;
//             console.log(eventId, "eventid")
//             return eventId;
//         } catch (error) {
//             console.log(error, "shit failed")
//             throw error;
//         }
//     }

// }

// module.exports = Events;
