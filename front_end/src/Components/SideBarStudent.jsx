import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SidebarStudent = () => {

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
            {/* Add more links as needed */}
          </ul>
        </div>
      );
}

export default SidebarStudent;