import * as React from "react";
import "./ThingsToDo.css";
import { Params, useLoaderData } from "react-router-dom";

type thingsToDoData = {
  thingsToDo: {
    accessibilityInformation: string;
    feeDescription: string;
    images: { url: string; title: string; altText: string }[];
    petsDescription: string;
    reservationDescription: string;
    season: string[];
    seasonDescription: string;
    shortDescription: string;
    title: string;
    id: string;
    duration: string;
  }[];
};

export async function loadThingsToDo({
  params,
}: {
  params: Params;
}): Promise<thingsToDoData | null> {
  const thingsToDoResponse = await fetch(
    `https://developer.nps.gov/api/v1/thingstodo?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const thingsToDoData = await thingsToDoResponse.json();
  console.log(params.park);
  return { thingsToDo: thingsToDoData.data };
}

function ThingsToDo() {
  const ThingsToDo_LD = useLoaderData() as thingsToDoData;
  console.log("ThingsToDo_LD:", ThingsToDo_LD);
  let thingsToDoArr: React.ReactElement[] = [];
  if (ThingsToDo_LD.thingsToDo.length > 0) {
    thingsToDoArr = ThingsToDo_LD.thingsToDo.map((thing) => {
      return (
        <div key={thing.id}>
          <h2>{thing.title}</h2>
          <img
            src={thing.images[0].url}
            alt={thing.images[0].altText}
            width={100}
          />
          <p>
            {thing.shortDescription !== ""
              ? `Description: ${thing.shortDescription.replace(
                  /(<([^>]+)>)/gi,
                  ""
                )}`
              : "Description: N/A"}
          </p>
          <p>
            {thing.duration !== ""
              ? `Duration: ${thing.duration.replace(/(<([^>]+)>)/gi, "")}`
              : "Duration: N/A"}
          </p>
          <p>
            {thing.season.length > 0
              ? `Season: ${thing.season.join(", ")}`
              : "Season: N/A"}
          </p>
          <p>
            {thing.seasonDescription !== ""
              ? `Season Description: ${thing.seasonDescription.replace(
                  /(<([^>]+)>)/gi,
                  ""
                )}`
              : "Season Description: N/A"}
          </p>
          <p>
            {thing.feeDescription !== ""
              ? `Fee: ${thing.feeDescription.replace(/(<([^>]+)>)/gi, "")}`
              : "Fee: N/A"}
          </p>
          <p>
            {thing.accessibilityInformation !== ""
              ? `Accessibility: ${thing.accessibilityInformation.replace(
                  /(<([^>]+)>)/gi,
                  ""
                )}`
              : "Accessibility: N/A"}
          </p>
          <p>
            {thing.reservationDescription !== ""
              ? `Reservation: ${thing.reservationDescription.replace(
                  /(<([^>]+)>)/gi,
                  ""
                )}`
              : "Reservation: N/A"}
          </p>
          <p>
            {thing.petsDescription !== ""
              ? `Pets: ${thing.petsDescription.replace(/(<([^>]+)>)/gi, "")}`
              : "Pets: N/A"}
          </p>
          {/* <p>{thing.bodyText.replace(/(<([^>]+)>)/gi, "")}</p> */}
        </div>
      );
    });
  }

  return (
    <div className="ThingsToDo">
      <h1 className="thingstodo__title">Things to do</h1>
      {thingsToDoArr.length > 0 ? (
        <div className="things_container">{thingsToDoArr}</div>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
}

export default ThingsToDo;

// https://developer.nps.gov/api/v1/places?limit=1000&parkCode=romo&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm

// https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393
// syntax for google search link by lat/long %2C is URL encode for space
// first value = lat, second value = long
// rather then using a space you can use a comma like this
// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
