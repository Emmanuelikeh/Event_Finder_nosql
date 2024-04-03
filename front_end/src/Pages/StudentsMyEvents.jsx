import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyEvents = () => {
  const rsvpdEvents = [
    { id: 1, name: 'Music Concert', date: 'April 15, 2024', location: 'Campus Auditorium', capacity: 200 },
    { id: 2, name: 'Sports Day', date: 'May 5, 2024', location: 'Football Field', capacity: 150 },
    { id: 3, name: 'Movie Night', date: 'June 10, 2024', location: 'Student Center', capacity: 100 },
  ];

  const handleCancelRSVP = (eventId) => {
    // Handle canceling RSVP logic here
    console.log(`Cancel RSVP for event with ID ${eventId}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Events</h1>
      <div className="row">
        {rsvpdEvents.map((event, index) => (
          <div key={event.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Date: {event.date}</p>
                <p className="card-text">Location: {event.location}</p>
                <p className="card-text">Capacity: {event.capacity}</p>
                <button className="btn btn-danger btn-block w-100" onClick={() => handleCancelRSVP(event.id)}>
                  Cancel RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
