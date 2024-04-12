import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EventAnalytics = () => {
  const [attendee, setAttendee] = useState([]);
  // Dummy event data
  const eventData = {
    EventName: 'Summer Music Festival',
    EventDate: '2023-06-15',
    Location: 'Central Park, New York',
    Capacity: 5000,
    TotalAttendees: 4200,
    Attendees: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', ticketType: 'General Admission' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', ticketType: 'VIP' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', ticketType: 'Early Bird' },
      // Add more attendees as needed
    ],
  };

  // Dummy data for demonstration purposes
  const attendeeData = [
    { name: 'General Admission', count: 3000 },
    { name: 'VIP', count: 800 },
    { name: 'Early Bird', count: 400 },
  ];

  const signupData = [
    { date: '2023-04-01', count: 200 },
    { date: '2023-04-08', count: 500 },
    { date: '2023-04-15', count: 1000 },
    { date: '2023-04-22', count: 1500 },
    { date: '2023-04-29', count: 1000 },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Event Analytics</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Event: {eventData.EventName}</h5>
              <p className="card-text">Date: {eventData.EventDate}</p>
              <p className="card-text">Location: {eventData.Location}</p>
              <p className="card-text">Capacity: {eventData.Capacity}</p>
              <p className="card-text">Total Attendees: {eventData.TotalAttendees}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Attendee Breakdown</h5>
              <BarChart width={500} height={300} data={attendeeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sign-up Progress</h5>
              <BarChart width={500} height={300} data={signupData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Attendee List</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Ticket Type</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.Attendees.map((attendee) => (
                    <tr key={attendee.id}>
                      <td>{attendee.name}</td>
                      <td>{attendee.email}</td>
                      <td>{attendee.ticketType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;