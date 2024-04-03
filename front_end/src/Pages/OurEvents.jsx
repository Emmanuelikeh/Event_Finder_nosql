import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OurEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const events = [
    { id: 1, orgId: 1, name: 'Interview Prep', date: 'April 15, 2024', location: 'Campus Auditorium', capacity: 200 },
    { id: 2, orgId: 1, name: 'Hackathon', date: 'May 5, 2024', location: 'Football Field', capacity: 150 },
    { id: 3, orgId: 1, name: 'Resume Review', date: 'June 10, 2024', location: 'Student Center', capacity: 100 },
    // Add more events for other organizations as needed
  ];

  const handleEditEvent = (eventId) => {
    // Handle editing event logic here
    console.log(`Edit event with ID ${eventId}`);
  };

  const handleDeleteEvent = (eventId) => {
    // Handle deleting event logic here
    console.log(`Delete event with ID ${eventId}`);
  };

  const handleViewAnalytics = (eventId) => {
    // Handle viewing analytics logic here
    console.log(`View analytics for event with ID ${eventId}`);
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
        <h1 className="mb-0">Our Events</h1>
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
                <p className="card-text">Capacity: {event.capacity}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" style={{ flex: '1' }} onClick={() => handleEditEvent(event.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger mx-2" style={{ flex: '1' }} onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </button>
                  <button className="btn btn-info" style={{ flex: '2' }} onClick={() => handleViewAnalytics(event.id)}>
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurEvents;
