import * as React from "react";
import { Outlet, NavLink, Link, useParams } from "react-router-dom";
import "./ParkMain.css";
import menuIcon2Black from "../images/menuIcon2Black.png";
import arrowIcon from "../images/arrowIcon.png";
import { viewportContext } from "./RootComponent";

function ParkMain() {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const Park_params = useParams();
  const viewportWidth = React.useContext(viewportContext) as { width: number };
  const breakpoint = 1351;

  const menuToggleFunc = () => {
    setMenuToggle((prev) => !prev);
  };

  console.log(menuToggle);

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
          <div className="backlink__container_nav">
            <Link
              to={`/find_park?state=${Park_params.stateCode}`}
              className="back__link"
            >
              <img src={arrowIcon} alt="back arrow" height="10px" />
              <span className="back__text">Find Park</span>
            </Link>
          </div>
          <button className="nav_menu_btn" onClick={menuToggleFunc}>
            <span style={{ wordBreak: "normal" }}>Menu</span>
            <img className="menu_btn_icon" src={menuIcon2Black} alt="" />
          </button>
        </nav>
      </div>
      {viewportWidth.width > breakpoint && (
        <div className="backlink__container_body">
          <Link
            to={`/find_park?state=${Park_params.stateCode}`}
            className="back__link"
          >
            <img src={arrowIcon} alt="back arrow" height="10px" />
            <span className="back__text">Find Park</span>
          </Link>
        </div>
      )}
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
      <Outlet />
    </div>
  );
}

export default ParkMain;
