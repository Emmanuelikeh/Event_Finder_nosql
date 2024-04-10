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
        const query = `DELETE FROM bookings WHERE bookingid = ?`;
        try {
            await dbConnection.query(query, [BookingID]);
        } catch (error) {
            throw error;
        }
    }

    // get all bookings for an event
    static async getBookingsByEvent(EventID) {
        const query = `SELECT * FROM bookings WHERE eventid = ?`;
        try {
            const rows = await dbConnection.query(query, [EventID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Bookings;