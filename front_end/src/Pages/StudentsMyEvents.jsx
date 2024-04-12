import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyEvents = () => {
  // const rsvpdEvents = [
  //   { id: 1, name: 'Music Concert', date: 'April 15, 2024', location: 'Campus Auditorium', capacity: 200 },
  //   { id: 2, name: 'Sports Day', date: 'May 5, 2024', location: 'Football Field', capacity: 150 },
  //   { id: 3, name: 'Movie Night', date: 'June 10, 2024', location: 'Student Center', capacity: 100 },
  // ];

  const [rsvpdEvents, setRsvpdEvents] = useState([]);


  useEffect(() => {
    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.id;
    const fetchRsvpdEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/events/registered/${userID}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setRsvpdEvents(data);
      }
      catch (error) {
        console.error('Error fetching RSVP events:', error);
      }
    }
    fetchRsvpdEvents(); 
  }, []);



  const  handleCancelRSVP = async (eventId) => {
    // Handle canceling RSVP logic here
    console.log(`Cancel RSVP for event with ID ${eventId}`);

    try{
      const response = await fetch(`http://localhost:5001/api/bookings/deleteBooking/${eventId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },

      });
      const data = await response.json();
      console.log(data);
      // Remove the canceled event from the rsvpdEvents state
      setRsvpdEvents(rsvpdEvents.filter(event => event.BookingID !== eventId));
      

    }catch(error){
      console.error('Error canceling RSVP:', error);
    };
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Events</h1>
      <div className="row">
        {rsvpdEvents.map((event, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.EventName}</h5>
                <p className="card-text">Date: {event.EventDate}</p>
                <p className="card-text">Location: {event.Location}</p>
                <p className="card-text">Capacity: {100}</p>
                <button className="btn btn-danger btn-block w-100" onClick={() => handleCancelRSVP(event.BookingID)}>
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
