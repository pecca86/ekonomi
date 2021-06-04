import React, { Fragment } from "react";
import SidebarItem from "./SideBarItem";

const Sidebar = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <ul className="nav flex-column">
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </ul>
    </nav>
  );
};

export default Sidebar;
