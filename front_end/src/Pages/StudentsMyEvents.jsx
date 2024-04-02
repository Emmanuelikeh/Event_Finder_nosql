import React from 'react';
import './StudentsMyEvents.css'; // Assuming this is the file name for your CSS

const StudentsMyEvents = () => {
  const events = [
    {
      id: 1,
      name: 'Music Concert',
      date: 'April 15, 2024',
      location: 'Campus Auditorium',
      capacity: 200
    },
    {
      id: 2,
      name: 'Sports Day',
      date: 'May 5, 2024',
      location: 'Football Field',
      capacity: 150
    },
    {
      id: 3,
      name: 'Movie Night',
      date: 'June 10, 2024',
      location: 'Student Center',
      capacity: 100
    },
    // Add more events here
  ];

  const handleRSVP = (eventId) => {
    // Handle RSVP logic here, e.g., send a request to your backend API
    console.log(`RSVP for event with ID ${eventId}`);
  };

  return (
    <div className="event-container">
      {events.map(event => (
        <div key={event.id} className="event-box">
          <h2>{event.name}</h2>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Capacity: {event.capacity}</p>
          <button onClick={() => handleRSVP(event.id)}>RSVP</button>
        </div>
      ))}
    </div>
  );
};

export default StudentsMyEvents;
