import React from "react";
import "./IndexHome.css";
import { Link } from "react-router-dom";
import Mountain4 from "../images/Mountain4.png";

function IndexHome() {
  return (
    <div className="IndexHome">
      <img
        src={Mountain4}
        alt="mountain4"
        style={{ width: "400px", float: "right" }}
      />
      <h1 className="title">What is All Parks ?</h1>
      <p className="p_IndexHome">
        All Parks is an app that allows you to find any{" "}
        <b>Nationally Designated</b> area in the United States. You can find
        Nationally Designated areas by state. This includes National Parks,
        National Preserves, National Historic Sites, National Monuments and
        more!
      </p>
      <p className="p_IndexHome">
        You will find a ton of exciting information for each Nationally
        Designated Area such as pictures, videos, amenities, directions, and
        more!{" "}
      </p>
      <h2 className="supporting_titles">How to use this app?</h2>
      <p className="p_IndexHome">
        1. Click Find Park in the navigation bar or{" "}
        <Link to="/find_park">click here</Link>. <br />
        2. Select a state and click submit. <br />
        3. A list of Nationally Designated areas will be provided. <br />
        4. Click a link.
      </p>
      <h2 className="supporting_titles">Disclaimer</h2>
      <p className="p_IndexHome">
        This app is not intended for use, it is a project created by Brian
        Walters for the purpose of learning. All credit goes to the National
        Park Services for providing a wonderful API, and to anyone else who
        contributed to the valuable data set.
      </p>
    </div>
  );
}

export default IndexHome;
