import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    // Clear the form
    setEmail('');
    setPassword('');
    setRole('');

    if (role === "organizer") {
      setRole('true');
    }
    else {
      setRole('false');
    }

    // try and log in the user from the api , if it is s
    fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Save the token in local storage
        localStorage.setItem('token', data.token);
        // Redirect the user to the dashboard
        if (role === 'organizer') {
          window.location.href = '/organization-dashboard';
        } else {
          window.location.href = '/students-available-events';
        }
      })
      .catch((err) => {
        console.log('Error logging in')
        console.log(err.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select your role</option>
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;