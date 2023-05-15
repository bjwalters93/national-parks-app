import React from "react";
import "./RootComponent.css";
import logo from "../images/mountain-icon_green.png";
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

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
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={`find_park`}>Find Park</NavLink>
        </nav>
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}

export default RootComponent;
