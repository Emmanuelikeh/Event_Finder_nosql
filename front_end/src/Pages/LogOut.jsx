import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const LogOut = () => {
    const [show, setShow] = useState(false);

    function handleLogout() {
        // Clear user and token from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Redirect to login page
        window.location.href = '/login';
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Button onClick={handleShow}>Log Out</Button>
            
            <Modal onShow={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to log out?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleLogout}>Yes</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default LogOut;