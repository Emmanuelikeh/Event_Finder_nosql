import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentsAvailableEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    { id: 1, name: 'Music Concert', date: 'April 15, 2024', location: 'Campus Auditorium', org: 'Nepalese Club' },
    { id: 2, name: 'Sports Day', date: 'May 5, 2024', location: 'Football Field', org: 'Sports Club' },
    { id: 3, name: 'Movie Night', date: 'June 10, 2024', location: 'Student Center', org: 'Film Club' },
    { id: 4, name: 'Art Exhibition', date: 'July 20, 2024', location: 'Art Gallery', org: 'Art Club' },
    { id: 5, name: 'Tech Symposium', date: 'August 15, 2024', location: 'Engineering Building', org: 'Engineering Society' },
    { id: 6, name: 'Career Fair', date: 'September 25, 2024', location: 'Gymnasium', org: 'Career Services' },
    { id: 7, name: 'Food Festival', date: 'October 12, 2024', location: 'Campus Lawn', org: 'Culinary Club' },
    { id: 8, name: 'Science Fair', date: 'November 5, 2024', location: 'Science Building', org: 'Science Club' },
    { id: 9, name: 'Dance Performance', date: 'December 18, 2024', location: 'Performing Arts Center', org: 'Dance Club' }
  ];

  const handleRSVP = (eventId) => {
    // Handle RSVP logic here, e.g., send a request to your backend API
    console.log(`RSVP for event with ID ${eventId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Available Events</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: '300px' }} // Limit width of search input
        />
      </div>
      <div className="row">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Date: {event.date}</p>
                <p className="card-text">Location: {event.location}</p>
                <p className="card-text"> {event.org}</p>
                <button className="btn btn-primary btn-block w-100" onClick={() => handleRSVP(event.id)}>
                  RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsAvailableEvents;
