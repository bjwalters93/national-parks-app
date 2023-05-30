import * as React from "react";
import "./CampgroundsLanding.css";
import { useCampgroundData } from "./Campgrounds";
import { Link } from "react-router-dom";

function CampgroundsLanding() {
  const Campgrounds_LD = useCampgroundData();
  let campgroundsArr: React.ReactElement[] = [];
  if (Campgrounds_LD.campgrounds.length > 0) {
    campgroundsArr = Campgrounds_LD.campgrounds.map((campground) => {
      return (
        <li className="campground_container" key={campground.id}>
          <Link to={campground.name}>
            <h2>{campground.name}</h2>
          </Link>
          <ul>
            <li>
              <span className="span_bold_1_CL">Classification: </span>
              {campground.accessibility.classifications.join(", ")}
            </li>
            <li>
              <span className="span_bold_1_CL">Total Campsites: </span>{" "}
              {campground.campsites.totalSites}
            </li>
            <li>
              <span className="span_bold_1_CL">Reservation Info: </span>{" "}
              {campground.reservationInfo}
            </li>
          </ul>
        </li>
      );
    });
  }
  return <ol className="CampgroundsLanding">{campgroundsArr}</ol>;
}

export default CampgroundsLanding;
