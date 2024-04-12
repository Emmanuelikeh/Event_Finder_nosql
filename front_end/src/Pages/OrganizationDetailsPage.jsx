import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';


// Static data for demonstration purposes
// const organizationDetails = {
//   name: 'Acme Events',
//   email: 'info@acmeevents.com',
//   imageUrl: 'https://via.placeholder.com/150', // Replace with the actual image URL
//   events: [
//     {
//       id: 1,
//       name: 'Tech Summit 2024',
//       date: '2024-06-15',
//       isRegistered: true,
//     },
//     {
//       id: 2,
//       name: 'Music Festival',
//       date: '2024-08-20',
//       isRegistered: false,
//     },
//     {
//       id: 3,
//       name: 'Art Exhibition',
//       date: '2024-10-01',
//       isRegistered: true,
//     },
//   ],
// };


const OrganizationDetailPage = () => {
  // Get the organization details from the location state
  const location = useLocation();
  const [organizationDetails, setOrganizationDetails] = useState([])
  const navigate = useNavigate();
  const { USERID, USERNAME, EMAIL } = location.state;
  console.log(USERID, USERNAME, EMAIL);

  //   router.get('/getIsRegisteredEvents/:userID', auth, async (req, res) => {
  //     const userID = req.params.userID;
  //     try {
  //         console.log("Get all events");
  //         const events = await Event.getEventsAndCheckIfRegistered(userID);
  //         res.json(events);
  //     } catch (error) {
  //         res.status(500).json({ error });
  //     }
  // });

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/events/getIsRegisteredEvents/${USERID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        console.log(data);
        setOrganizationDetails(data);
      }
      catch (error) {
        console.error('Error fetching organization details:', error);
      }
    }
    fetchOrganizationDetails();
  }, [])

  const handleRSVP = (EventID, EventName,Location, Organizer,  EventDescription, EventDate, StartTime, EndTime)=> {
    // navigate to the booking page
    //  eventId, eventName, location, organizer, eventDescription, startTime, endTime
   
    navigate('/booking', { state: { EventID, EventName, Location, Organizer, EventDescription, EventDate, StartTime, EndTime } });
  };


  return (
    <Container>
      <Row className="my-4">
        <Col md={4}>
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/5/53/.org_logo.png"}
            alt={USERNAME}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h2>{USERNAME}</h2>
          <p>{EMAIL}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Upcoming Events</h3>
          {organizationDetails.map((event) => (
            <Card key={event.EventID} className="mb-3">
              <Card.Body>
                <Card.Title>{event.EventName}</Card.Title>
                <Card.Text>Date: {"Today is Today"}</Card.Text>
                <Button
                  variant={event.isRegistered === 1 ? 'success' : 'primary'}
                  disabled={event.isRegistered === 1}
                  onClick={() => event.isRegistered === 0 && handleRSVP(event.EventID, event.EventName, event.Location, USERNAME, event.EventDescription, event.EventDate, event.StartTime, event.EndTime)}
                >
                  {event.isRegistered === 1 ? 'Registered' : 'RSVP'}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationDetailPage;