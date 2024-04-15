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

