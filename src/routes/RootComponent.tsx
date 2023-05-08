import React from "react";
import "./RootComponent.css";
import logo from "../images/mountain-icon_white.png";
import { Outlet, NavLink } from "react-router-dom";

function RootComponent() {
  return (
    <div className="Root">
      <div className="NavBar">
        <NavLink to={"/"} className="Logo">
          <img
            src={logo}
            alt="mountain icon"
            style={{ width: "50px", marginRight: "10px" }}
          />
          All Parks
        </NavLink>
        <nav className="NavLinks">
          <ul>
            <li>
              <NavLink to={`find_park`}>Find Park</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default RootComponent;
