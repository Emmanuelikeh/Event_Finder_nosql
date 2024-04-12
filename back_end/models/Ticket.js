const dbConnection = require('../config/dbConnection');

class Tickets {

    static async getAllTickets() {
        const query = `SELECT * FROM tickets`;
        try {
            const rows = await dbConnection.query(query); 
            return rows[0];
        } catch (error) {
            throw error;
        }

    }

    static async getTicketsByEvent(EventID) {
        const query = `SELECT * FROM tickets WHERE eventid = ?`;
        try {
            const rows = await dbConnection.query(query, [EventID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createTicket(EventID, TicketType, TicketDescription, Price, AvailableQuantity) {
        const query = `INSERT INTO tickets (eventid, tickettype, ticketdescription, price, availablequantity) VALUES (?, ?, ?, ?, ?)`;
        try {
            await dbConnection.query(query, [EventID, TicketType, TicketDescription, Price, AvailableQuantity]);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // get ticket type and count for an event
    static  async  getTicketCount(EventID) {
        const query = `
        SELECT TicketType, COUNT(*) AS count
        FROM Tickets
        WHERE EventID = ${EventID}
        GROUP BY TicketType
      `;
        try {
            const rows = await dbConnection.query(query, [EventID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }


}

module.exports = Tickets;