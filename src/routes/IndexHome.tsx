import React from "react";
import "./IndexHome.css";
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
        All Parks is an app that allows you to find any National Park in the
        United States. You can find parks by state, or by available activities.
        That way you can be sure to find the right park for you!
      </p>
      <h2 className="supporting_titles">How to use this app?</h2>
      <p className="p_IndexHome">
        Follow the navigation links in the navigation bar.
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
