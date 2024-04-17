import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditEvent = () => {
    const { eventId } = useParams();
    const [formData, setFormData] = useState({
        EventID: '',
        EventName: '',
        EventDescription: '',
        EventDate: '',
        StartTime: '',
        EndTime: '',
    });
    const [token, setToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
        fetch(`http://localhost:5001/api/events/getEvent/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFormData({
                    EventID: data._id,
                    EventName: data.eventName,
                    EventDescription: data.eventDescription,
                    EventDate: new Date(data.eventDate).toISOString().split('T')[0],
                    StartTime: getTimeFromDate(new Date(data.eventStartTime)),
                    EndTime: getTimeFromDate(new Date(data.eventEndTime)),
                });
            })
            .catch((error) => {
                console.error('Error fetching event:', error);
            });
    }, [eventId, token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // get time from date object 
    const getTimeFromDate = (date) => {
        return date.toTimeString().split(' ')[0];
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(eventId, formData)
        try {
             fetch(`http://localhost:5001/api/events/updateEvents`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })
            .then(async response => {
                if (response.ok) {
                  return response.json();
                } else {
                  const data = await response.json();
                    alert(data.message);
                }
              })
              .then(data => {
                alert(data.message);
                // Redirect the user to the dashboard
                window.location.href = '/organization-dashboard';
              })
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
    return (
        <div className="container my-5">
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="eventName"
                        name="EventName"
                        value={formData.EventName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                        className="form-control"
                        id="eventDescription"
                        name="EventDescription"
                        rows="3"
                        value={formData.EventDescription}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="eventDate"
                        name="EventDate"
                        value={formData.EventDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="eventStartTime"
                        name="StartTime"
                        value={formData.StartTime}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventEndTime">End Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="eventEndTime"
                        name="EndTime"
                        value={formData.EndTime}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default EditEvent;