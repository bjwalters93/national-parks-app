import * as React from "react";
import { Outlet } from "react-router-dom";
import "./ParkMain.css";
import { NavLink } from "react-router-dom";

function ParkMain() {
  return (
    <div className="ParkMain">
      <div className="secondary_navbar">
        <nav className="secondary_navlinks">
          <NavLink to="." end>
            Park
          </NavLink>
          <NavLink to="activities">Activities</NavLink>
          <NavLink to="people">People</NavLink>
          <NavLink to="videos">Videos</NavLink>
          <NavLink to="campgrounds">Campgrounds</NavLink>
          <NavLink to="directions">Directions</NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default ParkMain;
