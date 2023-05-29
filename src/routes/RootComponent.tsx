import React from "react";
import "./RootComponent.css";
import logo from "../images/mountain-icon_green.png";
import homeIconWhite from "../images/homeIconWhite.png";
import findIconWhite from "../images/findIconWhite.png";
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import useViewport from "../custom_hooks/useViewport";
import ScrollButton from "../secondary_components/ScrollButton";

export const viewportContext = React.createContext<{ width: number } | null>(
  null
);

function RootComponent() {
  const { width } = useViewport();
  return (
    <viewportContext.Provider value={{ width }}>
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
          <NavLink to={"/"} className="Logo_mq">
            <img
              className="logo_img_mq"
              src={logo}
              alt="mountain icon"
              //   style={{ width: "50px", marginRight: "10px" }}
            />
            All Parks
          </NavLink>
          <nav className="NavLinks">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={`find_park`}>Find Park</NavLink>
          </nav>
          <nav className="NavLinks_mq">
            <NavLink to={"/"}>
              <img src={homeIconWhite} alt="home icon" />
            </NavLink>
            <NavLink to={`find_park`}>
              <img src={findIconWhite} alt="home icon" />
            </NavLink>
          </nav>
        </div>
        <Outlet />
        <ScrollButton />
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = ["/find_park"];
            return paths.includes(location.pathname)
              ? // home and notifications restore by pathname
                location.pathname
              : // everything else by location like the browser
                location.key;
          }}
        />
      </div>
    </viewportContext.Provider>
  );
}

export default RootComponent;
