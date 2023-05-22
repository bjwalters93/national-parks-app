import * as React from "react";
import "./Places.css";
import { Params, useLoaderData } from "react-router-dom";

type placesData = {
  places: {
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
  }[];
};

export async function loadPlaces({
  params,
}: {
  params: Params;
}): Promise<placesData | null> {
  const placesResponse = await fetch(
    `https://developer.nps.gov/api/v1/places?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const placesData = await placesResponse.json();
  const parkResponse = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await parkResponse.json();
  console.log(params.park);
  return { places: placesData.data, park: parkData.data };
}

function Places() {
  const Places_LD = useLoaderData() as placesData;
  console.log("Places_LD:", Places_LD);
  let placesArr: React.ReactElement[] = [];
  if (Places_LD !== null) {
    placesArr = Places_LD.places.map((places) => {
      return (
        <div key={places.id}>
          <h2>{places.title}</h2>
          <p>{places.bodyText.replace(/(<([^>]+)>)/gi, "")}</p>
          {/* <p>{places.listingDescription}</p> */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${places.latitude}+${places.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
        </div>
      );
    });
  }
  return (
    <div className="Places">
      <h1 className="places__title">
        Places related to {Places_LD.park[0].fullName}
      </h1>
      {placesArr.length > 0 && (
        <div className="places_container">{placesArr}</div>
      )}
    </div>
  );
}

export default Places;

// https://developer.nps.gov/api/v1/places?limit=1000&parkCode=romo&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm

// https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393
// syntax for google search link by lat/long %2C is URL encode for space
// first value = lat, second value = long
// rather then using a space you can use a comma like this
// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
