import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/organization-dashboard" activeClassName="active">
                        Dashboard
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
                {/* Add more links as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;