import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const BookingPage = () => {
  const { state } = useLocation();
  const { EventID, EventName, Location, Organizer, EventDescription, EventDate, StartTime, EndTime, Tickets } = state;
  console.log(EventID, EventName, Location, Organizer, EventDescription, EventDate, StartTime, Tickets);

  const [tickets, setTickets] = useState(Tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create booking object and send to backend
    // get token from local storage
    const token = localStorage.getItem('token');
    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const AttendeeID = user._id;

    const bookingData = {
      EventID: EventID, 
      AttendeeID: AttendeeID, // Replace with actual user ID
      TicketID: selectedTicket._id,
      BookingDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      PaymentStatus: 'Paid',
    };

    try {
      // Send bookingData to backend
      await fetch('http://localhost:5001/api/bookings/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      // Clear form fields
      setSelectedTicket(null);
      setPaymentInfo({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
      });

      // Redirect to home page
      window.location.href = '/students-available-events';

    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };
 

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





  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">{EventName}</h1>
          <p>{EventDescription}</p>
          <p>Location: {Location}</p>
          <p>Organizer: {Organizer}</p>
          <p>Date and Time: {formatDate(EventDate, StartTime, EndTime)}</p>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="ticketSelect" className="form-label">
                  Select Ticket
                </label>
                <select
                  className="form-select"
                  id="ticketSelect"
                  value={selectedTicket?._id || ''}
                  onChange={(e) => handleTicketSelect(tickets.find((t) => t._id === e.target.value))}
                >
                  <option value="">Select a ticket</option>
                  {tickets.map((ticket) => (
                    <option key={ticket._id} value={ticket._id}>
                      {ticket.ticketType} - ${ticket.ticketPrice} , Quantity: {ticket.ticketAvailableQuantity}
                    </option>
                  ))}
                </select>   
              </div>
            </div>
            {selectedTicket?.ticketPrice > 0 && (
              <div className="col-md-6">
                <h3>Payment</h3>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expirationDate" className="form-label">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expirationDate"
                    value={paymentInfo.expirationDate}
                    onChange={(e) => handlePaymentInfoChange('expirationDate', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;