import React from 'react';
import Sidebar from './SideBar';
import SidebarStudent from './SideBarStudent';
import './Layout.css';

const Layout = ({ children }) => {
    const isChildrenA = (children.type.name === 'OrganizationDashboard' ||children.type.name === 'OurEvents' || children.type.name === 'CreateEventForm'); // Replace 'ComponentA' with the actual name of the component you want to render SidebarA for
  return (
    <div className="layout">
      {isChildrenA ? <Sidebar />: <SidebarStudent />}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;



