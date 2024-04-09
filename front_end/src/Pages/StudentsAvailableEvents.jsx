import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentsAvailableEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);

  // const events = [
  //   { id: 1, name: 'Music Concert', date: 'April 15, 2024', location: 'Campus Auditorium', org: 'Nepalese Club' },
  //   { id: 2, name: 'Sports Day', date: 'May 5, 2024', location: 'Football Field', org: 'Sports Club' },
  //   { id: 3, name: 'Movie Night', date: 'June 10, 2024', location: 'Student Center', org: 'Film Club' },
  //   { id: 4, name: 'Art Exhibition', date: 'July 20, 2024', location: 'Art Gallery', org: 'Art Club' },
  //   { id: 5, name: 'Tech Symposium', date: 'August 15, 2024', location: 'Engineering Building', org: 'Engineering Society' },
  //   { id: 6, name: 'Career Fair', date: 'September 25, 2024', location: 'Gymnasium', org: 'Career Services' },
  //   { id: 7, name: 'Food Festival', date: 'October 12, 2024', location: 'Campus Lawn', org: 'Culinary Club' },
  //   { id: 8, name: 'Science Fair', date: 'November 5, 2024', location: 'Science Building', org: 'Science Club' },
  //   { id: 9, name: 'Dance Performance', date: 'December 18, 2024', location: 'Performing Arts Center', org: 'Dance Club' }
  // ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events/getevents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          
          },
        });
        const data = await response.json();
        console.log(data);
        setEvents(data);
      }
      catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();

  }, []);

  const handleRSVP = (eventId) => {
    // Handle RSVP logic here, e.g., send a request to your backend API
    console.log(`RSVP for event with ID ${eventId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (date, startTime, endTime) => {
    const eventDate = new Date(date);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    const day = eventDate.toLocaleDateString('en-US', options);
  
    const startTimeArray = startTime.split(':');
    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);
    const startTimeDate = new Date(date);
    startTimeDate.setHours(startHour, startMinute, 0, 0);
  
    const endTimeArray = endTime.split(':');
    const endHour = parseInt(endTimeArray[0]);
    const endMinute = parseInt(endTimeArray[1]);
    const endTimeDate = new Date(date);
    endTimeDate.setHours(endHour, endMinute, 0, 0);
  
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = `${startTimeDate.toLocaleTimeString('en-US', timeOptions)} - ${endTimeDate.toLocaleTimeString('en-US', timeOptions)}`;
  
    return `${day}, ${time}`;
  };

  const filteredEvents = events.filter(event =>
    event.EventName.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h5 className="card-title">{event.EventName}</h5>
                <p className="card-text">Date: {formatDate(event.EventDate, event.StartTime, event.EndTime)}</p>
                <p className="card-text">Location: {event.Location}</p>
                <p className="card-text"> {event.Organizer}</p>
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
