const dbConnection = require('../config/dbConnection');
// Bookings Table:
// BookingID (Primary Key)
// EventID (Foreign Key referencing Events table)
// AttendeeID (Foreign Key referencing Users table)
// TicketID (Foreign Key referencing Tickets table)
// BookingDateTime
// PaymentStatus

class Bookings {
    static async createBooking(EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus) {
        console.log("Creating booking")

        const query = `INSERT INTO bookings (eventid, attendeeid, ticketid, bookingdatetime, paymentstatus) VALUES (?, ?, ?, ?, ?)`;
        try {
            await dbConnection.query(query, [EventID, AttendeeID, TicketID, BookingDateTime, PaymentStatus]);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // delete booking
    static async deleteBooking(BookingID) {
        console.log("Deleting booking")
        const query = `DELETE FROM bookings WHERE bookingid = ${BookingID}`;
        try {
            const response = await dbConnection.query(query);
            return response;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // get all attendees for an event 
    static async getAttendees(EventID) {
        console.log("Getting attendees")
        const query = `
        SELECT b.BookingID, b.AttendeeID, b.TicketID, u.Username, u.Email, t.TicketType
        FROM Bookings b
        JOIN Users u ON b.AttendeeID = u.UserID
        JOIN Tickets t ON b.TicketID = t.TicketID
        WHERE b.EventID = ${EventID}
      `;
        try {
            const response = await dbConnection.query(query);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // get date and  count of attendees for an event
    static async getAttendeesCount(EventID) {
        console.log("Getting attendees count")
        const query = `SELECT DATE(b.BookingDateTime) AS date, COUNT(*) AS count
        FROM Bookings b
        WHERE b.EventID = @eventId
        GROUP BY DATE(b.BookingDateTime)
        ORDER BY date`
        try {
            const response = await dbConnection.query(query);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}

module.exports = Bookings;