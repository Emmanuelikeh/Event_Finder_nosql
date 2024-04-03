import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    eventName: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    studentFirstName: '',
    studentLastName: '',
    studentCellphone: '',
    studentEmail: '',
    advisorFirstName: '',
    advisorLastName: '',
    advisorPhoneNumber: '',
    advisorCellphone: '',
    advisorEmail: '',
    eventBuilding: '',
    eventDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mt-4">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Organization Name</label>
          <input type="text" className="form-control" name="orgName" value={formData.orgName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" className="form-control" name="eventName" value={formData.eventName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Type</label>
          <input type="text" className="form-control" name="eventType" value={formData.eventType} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="text" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Time</label>
          <input type="text" className="form-control" name="eventTime" value={formData.eventTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Student First Name</label>
          <input type="text" className="form-control" name="studentFirstName" value={formData.studentFirstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Student Last Name</label>
          <input type="text" className="form-control" name="studentLastName" value={formData.studentLastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Student Cellphone</label>
          <input type="text" className="form-control" name="studentCellphone" value={formData.studentCellphone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Student Email</label>
          <input type="email" className="form-control" name="studentEmail" value={formData.studentEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Advisor First Name</label>
          <input type="text" className="form-control" name="advisorFirstName" value={formData.advisorFirstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Advisor Last Name</label>
          <input type="text" className="form-control" name="advisorLastName" value={formData.advisorLastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Advisor Phone Number</label>
          <input type="text" className="form-control" name="advisorPhoneNumber" value={formData.advisorPhoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Advisor Cellphone</label>
          <input type="text" className="form-control" name="advisorCellphone" value={formData.advisorCellphone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Advisor Email</label>
          <input type="email" className="form-control" name="advisorEmail" value={formData.advisorEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Building</label>
          <input type="text" className="form-control" name="eventBuilding" value={formData.eventBuilding} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Description</label>
          <textarea className="form-control" name="eventDescription" value={formData.eventDescription} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
