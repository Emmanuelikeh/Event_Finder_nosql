import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
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
          <NavLink to="/our-events" activeClassName="active">
            Our Events
          </NavLink>
        </li>
      
        <li>
          <NavLink to="/create-event" activeClassName="active">
            Create Event
          </NavLink>
        </li>

        <li>
          <NavLink to="/organization-dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;