import * as React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./ParkMain.css";
import menuIcon2Gold from "../images/menuIcon2Gold.png";

function ParkMain() {
  const [menuToggle, setMenuToggle] = React.useState(false);

  const menuToggleFunc = () => {
    setMenuToggle((prev) => !prev);
  };

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
        <nav className="secondary_navlinks_mq">
          <button className="nav_menu_btn" onClick={menuToggleFunc}>
            <span style={{ wordBreak: "normal" }}>Menu</span>
            <img className="menu_btn_icon" src={menuIcon2Gold} alt="" />
          </button>
          <ul className={!menuToggle ? "menu_hide" : "menu_show"}>
            <li onClick={menuToggleFunc}>
              <NavLink to="." end>
                Park
              </NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="places">Places</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="news">News</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="thingstodo">Things to do</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="people">People</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="videos">Videos</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="campgrounds">Campgrounds</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="visitorcenters">Visitor Centers</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="webcams">Webcams</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="amenities">Amenities</NavLink>
            </li>
            <li onClick={menuToggleFunc}>
              <NavLink to="directions">Directions</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default ParkMain;
