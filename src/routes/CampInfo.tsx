import * as React from "react";
import "./CampInfo.css";
import { Link, useParams } from "react-router-dom";
import arrowIcon from "../images/arrowIcon.png";

function CampInfo() {
  const Campground_params = useParams();
  return (
    <div className="CampInfo">
      <div className="backlink__container_campgrounds">
        <Link
          to={`/park/${Campground_params.stateCode}/${Campground_params.park}/campgrounds`}
          className="back__link_campgrounds"
        >
          <img src={arrowIcon} alt="back arrow" height="10px" />
          <span className="back__text_campgrounds">Campgrounds</span>
        </Link>
      </div>
      <h2>Campground Name</h2>
    </div>
  );
}

export default CampInfo;
