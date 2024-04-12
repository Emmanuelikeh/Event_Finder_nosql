import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';


const OrganizationDetailPage = () => {
  // Get the organization details from the location state
  const location = useLocation();
  const [organizationDetails, setOrganizationDetails] = useState([])
  const navigate = useNavigate();
  const { USERID, USERNAME, EMAIL } = location.state;
  console.log(USERID, USERNAME, EMAIL);


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