import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';

const OrganizationDashboard = () => {
  // Example data for organization's events and analytics

  const[totalEvents, setTotalEvents] = useState(0);
  const[totalAttendees, setTotalAttendees] = useState(0);
  const [data, setData] = useState([]);
  const organizationName = 'Computer Science Club';

  const [events, setEvents] = useState([]);
  // const totalEvents = 3;
  // const totalAttendees = 120;
  // const events = [
  //   { id: 1, name: 'Interview Prep', attendees: 40 },
  //   { id: 2, name: 'Hackathon', attendees: 60 },
  //   { id: 3, name: 'Resume Review', attendees: 20 }
  // ];


  // Data for the attendance chart

  useEffect(() => {
    // Fetch organization's events and analytics data
    // get userfrom  local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const organizerID = user._id;

    // /getTotalEventsAndAttendees/:organizerID


    fetch(`http://localhost:5001/api/events/getTotalEventsAndAttendees/${organizerID}`
    , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Update organization data
        // Example: setTotalEvents(data.totalEvents);
        // Example: setTotalAttendees(data.totalAttendees);
        setTotalEvents(data.totalEvents);
        setTotalAttendees(data.totalAttendees);
      })
      .catch(error => {
        console.error('Error fetching organization data:', error);
      });


      // /getThreeEvents/:organizerID


    fetch(`http://localhost:5001/api/events/getThreeEvents/${organizerID}`
    , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Update organization data
        // Example: setEvents(data);
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching organization data:', error);
      });


      // /getThreeEventsBookings/:organizerID
      fetch(`http://localhost:5001/api/bookings/getThreeEventsBookings/${organizerID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching organization data:', error);
      });

  }
  , []);

  const chartData = {
    labels: data.map(d => d.eventName),
    datasets: [
      {
        label: 'Attendance',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data:data.map(d => d.count),
      }
    ]
  };

  console.log(chartData)




  

  return (
    <div className="container mt-4">
      <h1>{organizationName} Dashboard</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Total Events: {totalEvents}</h5>
          <p className="card-text">Total Attendees: {totalAttendees}</p>
          <Link to="/organization/analytics" className="btn btn-primary">
            View Total Event Analytics
          </Link>
        </div>
      </div>
      <h2 className="mt-4">Individual Event Analytics</h2>
      <div className="row mt-4">
        {events.map((event, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <p className="card-text">Attendees: {data[index].count}</p>
                <Link to={`/organization/analytics/${event.id}`} className="btn btn-primary">
                  View Event Analytics
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-4">Attendance Chart</h2>
      <div className="mt-4">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default OrganizationDashboard;