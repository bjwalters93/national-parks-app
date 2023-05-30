import * as React from "react";
import "./CampInfo.css";
import { Link, useParams } from "react-router-dom";
import arrowIcon from "../images/arrowIcon.png";
import { useCampgroundData } from "./Campgrounds";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

type campgroundsData = {
  accessibility: {
    accessRoads: string[];
    adaInfo: string;
    additionalInfo: string;
    cellPhoneInfo: string;
    classifications: string[];
    fireStovePolicy: string;
    internetInfo: string;
    rvAllowed: string;
    rvInfo: string;
    rvMaxLength: string;
    trailerAllowed: string;
    trailerMaxLength: string;
    wheelchairAccess: string;
  };
  addresses: {
    city: string;
    countryCode: "string";
    line1: string;
    line2: string;
    line3: string;
    postalCode: string;
    stateCode: string;
  }[];
  amenities: {
    amphitheater: string;
    campStore: string;
    cellPhoneReception: string;
    dumpStation: string;
    firewoodForSale: string;
    foodStorageLockers: string;
    iceAvailableForSale: string;
    internetConnectivity: string;
    laundry: string;
    potableWater: string[];
    showers: string[];
    staffOrVolunteerHostOnsite: string;
    toilets: string[];
    trashRecyclingCollection: string;
  };
  campsites: {
    electricalHookups: string;
    group: string;
    horse: string;
    other: string;
    rvOnly: string;
    tentOnly: string;
    totalSites: string;
    walkToBoat: string;
  };
  contacts: {
    phoneNumbers: {
      phoneNumber: string;
    }[];
  };
  description: string;
  directionsOverview: string;
  fees: {
    cost: string;
    description: string;
    title: string;
  }[];
  id: string;
  images: {
    title: string;
    altText: string;
    url: string;
    caption: string;
  }[];
  name: string;
  numberOfSitesFirstComeFirstServe: string;
  numberOfSitesReservable: string;
  operatingHours: {
    description: string;
    exceptions: string[];
    standardHours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  }[];
  regulationsOverview: string;
  reservationInfo: string;
  reservationUrl: string;
  weatherOverview: string;
  url: string;
};

function CampInfo() {
  const Campgrounds_LD = useCampgroundData();
  const Campground_params = useParams();
  let campground = Campgrounds_LD.campgrounds.find(
    (element) => element.name === Campground_params.campName
  ) as campgroundsData;
  console.log("campground:", campground);

  const mapAddress = campground.addresses;

  const city = mapAddress[0].city;
  const line1 = mapAddress[0].line1;
  const line2 = mapAddress[0].line2;
  const line3 = mapAddress[0].line3;
  const postalCode = mapAddress[0].postalCode;
  const stateCode = mapAddress[0].stateCode;
  let mapUrlString;
  if (line1 !== "" && line2 === "" && line3 === "") {
    mapUrlString = encodeURI(`${line1},${city},${stateCode},${postalCode}`);
  } else if (line1 !== "" && line2 !== "" && line3 === "") {
    mapUrlString = encodeURI(
      `${line1},${line2},${city},${stateCode},${postalCode}`
    );
  } else if (line1 !== "" && line2 !== "" && line3 !== "") {
    mapUrlString = encodeURI(
      `${line1},${line2},${line3},${city},${stateCode},${postalCode}`
    );
  }

  console.log(mapUrlString);

  const slides = campground.images.map((image) => {
    return {
      src: image.url,
      alt: image.altText,
      title: image.title,
      description: image.caption,
    };
  });

  let campgroundElement: JSX.Element = (
    <div>
      <h2>{campground.name}</h2>
      {campground.images.length > 0 && (
        <Lightbox
          styles={{
            container: { fontFamily: "'Kanit', sans-serif" },
            captionsTitle: { fontSize: "14px" },
            captionsDescription: { fontSize: "12px" },
          }}
          plugins={[Inline, Counter, Captions, Zoom, Fullscreen]}
          inline={{
            style: { width: "100%", aspectRatio: "3 / 2" },
          }}
          slides={slides}
          counter={{ style: { top: 16, fontSize: "12px" } }}
          zoom={{ maxZoomPixelRatio: 10 }}
          animation={{ zoom: 200 }}
        />
      )}
      <p>
        <span className="span_bold_1_CI">Description: </span>
        {campground.description === "" ? "N/A" : campground.description}
      </p>
      <p>
        <span className="span_bold_1_CI">Weather: </span>
        {campground.weatherOverview === "" ? "N/A" : campground.weatherOverview}
      </p>
      <p>
        <span className="span_bold_1_CI">Reservation Info: </span>
        {campground.reservationInfo === "" ? "N/A" : campground.reservationInfo}
      </p>
      <p>
        <span className="span_bold_1_CI">ReservationUrl: </span>
        {campground.reservationUrl === "" ? (
          "N/A"
        ) : (
          <a href={campground.reservationUrl} target="_blank" rel="noreferrer">
            Make your reservation here
          </a>
        )}
      </p>
      <p>
        <span className="span_bold_1_CI">Regulations: </span>
        {campground.regulationsOverview === ""
          ? "N/A"
          : campground.regulationsOverview}
      </p>
      <p>
        <span className="span_bold_1_CI">Url: </span>
        {campground.url === "" ? (
          "N/A"
        ) : (
          <a href={campground.url} target="_blank" rel="noreferrer">
            National Parks Service
          </a>
        )}
      </p>
      <p>
        <span className="span_bold_1_CI">Directions Overview: </span>
        {campground.directionsOverview === ""
          ? "N/A"
          : campground.directionsOverview}
      </p>
      <p>
        <span className="span_bold_1_CI">Directions: </span>
        {campground.addresses.length === 0 ? (
          "N/A"
        ) : (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapUrlString}`}
            target="_blank"
            rel="noreferrer"
          >
            Google Maps
          </a>
        )}
      </p>
    </div>
  );
  //   if (campground !== undefined) {
  //     console.log("campground:", campground.name);
  //     campgroundElement = (
  //       <div>
  //         <h2>{campground.name}</h2>
  //       </div>
  //     );
  //   } else {
  //     campgroundElement = <p>Sorry, an uknown error has occured.</p>;
  //   }
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
      {campgroundElement}
    </div>
  );
}

export default CampInfo;
