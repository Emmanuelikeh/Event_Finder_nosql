const dbConnection = require('../config/dbConnection');


class Events {
    static async getAllEvents() {
        const query = `SELECT * FROM events`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query)
                .then(([result]) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err.message);
                    reject(err);
                });
        });
    }


    // get events by organizer -> user_id

    static async getEventsByOrganizer(user_id) {
        const query = `SELECT * FROM events WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query, [user_id])
                .then(([result]) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err.message);
                    reject(err);
                });
        });
    }

    // get events by name -> event_name, start with the name

    static async getEventsByName(event_name) {
        const query = `SELECT * FROM events WHERE event_name LIKE ?`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query, [event_name + '%'])
                .then(([result]) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err.message);
                    reject(err);
                });
        });
    }

    // get events by date -> date

    static async getEventsByDate(date) {
        const query = `SELECT * FROM events WHERE date = ?`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query, [date])
                .then(([result]) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err.message);
                    reject(err);
                });
        });
    }


    // get events by name -> event_name, start with the name and belongs to a specific organizer

    static async getEventsByNameAndOrganizer(event_name, user_id) {
        const query = `SELECT * FROM events WHERE event_name LIKE ? AND user_id = ?`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query, [event_name + '%', user_id])
                .then(([result]) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err.message);
                    reject(err);
                });
        });

    }

}

module.exports = Events;
