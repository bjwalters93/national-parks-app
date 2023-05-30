import * as React from "react";
import "./CampgroundsLanding.css";
import { useCampgroundData } from "./Campgrounds";
import { Link } from "react-router-dom";

function CampgroundsLanding() {
  const Campgrounds_LD = useCampgroundData();
  console.log("outlet:", Campgrounds_LD);
  let campgroundsArr: React.ReactElement[] = [];
  if (Campgrounds_LD.campgrounds.length > 0) {
    campgroundsArr = Campgrounds_LD.campgrounds.map((campground) => {
      return (
        <li className="campground_container" key={campground.id}>
          <Link to={campground.name}>
            <h2>{campground.name}</h2>
          </Link>
          <ul>
            <li>{campground.accessibility.classifications.join(", ")}</li>
            <li>Total Campsites: {campground.campsites.totalSites}</li>
            <li>Reservation Info: {campground.reservationInfo}</li>
          </ul>
        </li>
      );
    });
  }
  return <ol className="CampgroundsLanding">{campgroundsArr}</ol>;
}

export default CampgroundsLanding;
