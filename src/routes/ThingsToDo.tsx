import * as React from "react";
import "./ThingsToDo.css";
import { Params, useLoaderData } from "react-router-dom";
import { stateCodes } from "../utilityData";

type thingsToDoData = {
  thingsToDo: {
    title: string;
    amenities: [string];
    bodyText: string;
    images: { altText: string; title: string; url: string }[];
    latitude: string;
    longitude: string;
    id: string;
    listingDescription: string;
  }[];
  park: {
    fullName: string;
    latitude: string;
    longitude: string;
    addresses: { city: string; stateCode: string }[];
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
  const parkResponse = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await parkResponse.json();
  console.log(params.park);
  return { thingsToDo: thingsToDoData.data, park: parkData.data };
}

function ThingsToDo() {
  const ThingsToDo_LD = useLoaderData() as thingsToDoData;
  console.log("ThingsToDo_LD:", ThingsToDo_LD);
  console.log(
    "latitude:",
    ThingsToDo_LD.park[0].latitude,
    "longitude:",
    ThingsToDo_LD.park[0].longitude
  );
  let thingsToDoArr: React.ReactElement[] = [];
  if (ThingsToDo_LD.thingsToDo.length > 0) {
    thingsToDoArr = ThingsToDo_LD.thingsToDo.map((thing) => {
      return (
        <div key={thing.id}>
          <h2>{thing.title}</h2>
          {/* <p>{thing.bodyText.replace(/(<([^>]+)>)/gi, "")}</p> */}
          {/* <p>{thing.listingDescription}</p> */}
          {/* <a
            href={`https://www.google.com/maps/search/?api=1&query=${thing.latitude}+${thing.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a> */}
        </div>
      );
    });
  }

  let state = ThingsToDo_LD.park[0].addresses[0].stateCode;
  let city = ThingsToDo_LD.park[0].addresses[0].city;
  let fullState = stateCodes.find(({ code }) => code === state);
  console.log("fullState:", fullState);

  //   .split(",")
  //   .map((el) => {
  //     let state = stateCodes.find(({ code }) => code === el) as {
  //       name: string;
  //     };
  //     return state.name;
  //   })
  //   .join(", ");

  return (
    <div className="ThingsToDo">
      <h1 className="thingstodo__title">
        Things to do at {ThingsToDo_LD.park[0].fullName}
      </h1>
      {thingsToDoArr.length > 0 ? (
        <div className="things_container">{thingsToDoArr}</div>
      ) : (
        <p>N/A</p>
      )}
      <iframe
        className="alltrails"
        // src="https://www.alltrails.com/widget/us/ohio/troy?u=i&sh=ziykwr"
        src="https://www.alltrails.com/widget/us/ohio/troy?u=i&sh=ziykwr"
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"
      ></iframe>
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
