import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./SideBar.css";

const SidebarStudent = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  }

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    // Redirect to the login page or perform other necessary actions
    window.location.href = '/login';
  }

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  }

  // Existing sidebar code
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/students-available-events" activeClassName="active">
            Available Events
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/my-events" activeClassName="active">
            My Events
          </NavLink>
        </li>

        <li>
          <NavLink to="/students-organizations" activeClassName="active">
            Organizations
          </NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </li>
        {/* Add more links as needed */}
      </ul>

      <Modal show={showLogoutModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default SidebarStudent;