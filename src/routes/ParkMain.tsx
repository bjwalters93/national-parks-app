import * as React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./ParkMain.css";
import menuIconGold from "../images/menuIconGold.png";

function ParkMain() {
  return (
    <div className="ParkMain">
      <div className="secondary_navbar">
        <nav className="secondary_navlinks">
          <NavLink to="." end>
            Park
          </NavLink>
          <NavLink to="places">Places</NavLink>
          <NavLink to="news">News</NavLink>
          <NavLink to="thingstodo">Things to do</NavLink>
          <NavLink to="people">People</NavLink>
          <NavLink to="videos">Videos</NavLink>
          <NavLink to="campgrounds">Campgrounds</NavLink>
          <NavLink to="visitorcenters">Visitor Centers</NavLink>
          <NavLink to="webcams">Webcams</NavLink>
          <NavLink to="amenities">Amenities</NavLink>
          <NavLink to="directions">Directions</NavLink>
        </nav>
        <nav className="media_q_secondary_navlinks">
          <button className="nav_menu_btn">
            Menu
            <img
              src={menuIconGold}
              alt=""
              height={18}
              style={{ marginLeft: "5px" }}
            />
          </button>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default ParkMain;
