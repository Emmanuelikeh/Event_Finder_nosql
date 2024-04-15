const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    attendeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticketID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookingDateTime: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    }
});
const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;
