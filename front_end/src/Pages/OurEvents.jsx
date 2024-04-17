import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const OurEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API request to fetch events
    const fetchEvents = async () => {
      // get user from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const userID = user._id;
      // get token from local storage
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:5001/api/events/getevents/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date, startTime, endTime) => {
    const eventDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const day = eventDate.toLocaleDateString("en-US", options);

    const startTimeArray = startTime.split(":");
    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);
    const startTimeDate = new Date(date);
    startTimeDate.setHours(startHour, startMinute, 0, 0);

    const endTimeArray = endTime.split(":");
    const endHour = parseInt(endTimeArray[0]);
    const endMinute = parseInt(endTimeArray[1]);
    const endTimeDate = new Date(date);
    endTimeDate.setHours(endHour, endMinute, 0, 0);

    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const time = `${startTimeDate.toLocaleTimeString(
      "en-US",
      timeOptions
    )} - ${endTimeDate.toLocaleTimeString("en-US", timeOptions)}`;

    return `${day}, ${time}`;
  };
  const handleEditEvent = (eventId) => {
    // Handle editing event logic here
    navigate(`/edit-event/${eventId}`);
  };

  const handleDeleteEvent = (eventId) => {
    // Handle deleting event logic here
    console.log(`Delete event with ID ${eventId}`);
  };

  const handleViewAnalytics = (EventID, EventName, EventDescription, EventDate, StartTime, EndTime, VenueName, Location, Capacity) => {
    navigate("/our-event/event-analytics", { state: { EventID, EventName, EventDescription, EventDate, StartTime, EndTime, VenueName, Location, Capacity } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
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
          style={{ maxWidth: "300px" }}
        />
      </div>
      <div className="row">
        {filteredEvents.map((event, index) => (
          console.log(event.EventID),
          <div key={event._id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <p className="card-text">
                  Date:{" "}
                  {formatDate(event.eventDate, event.eventStartTime, event.eventEndTime)}
                </p>
                <p className="card-text">Location: {event.venueID.venueLocation}</p>
                <p className="card-text">Capacity: {event.venueID.venueCapacity}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    style={{ flex: "1" }}
                    onClick={() => handleEditEvent(event._id)}
                  >
                    Edit
                  </button>
                  {/* // const {EventID, EventName, EventDescription, EventDate, StartTime, EndTime, VenueName, Location , Capacity  } */}
                  <button className="btn btn-success mx-2"onClick={() => handleViewAnalytics(event._id, event.eventName, event.eventDescription, event.eventDate, event.eventStartTime, event.eventEndTime, event.venueID.venueName, event.venueID.venueLocation, event.venueID.venueCapacity)}>
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
