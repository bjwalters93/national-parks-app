import * as React from "react";
import "./ThingsToDo.css";
import { Params, useLoaderData } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";

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

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function ThingsToDo() {
  const ThingsToDo_LD = useLoaderData() as thingsToDoData;
  console.log("ThingsToDo_LD:", ThingsToDo_LD);
  let thingsToDoArr: React.ReactElement[] = [];
  if (ThingsToDo_LD.thingsToDo.length > 0) {
    thingsToDoArr = ThingsToDo_LD.thingsToDo.map((thing) => {
      return (
        <div key={thing.id} className="todo_container">
          <h2>{thing.title}</h2>
          <LazyLoad width="100%" threshold={0.1}>
            <img
              className="thingstodo_img"
              src={thing.images[0].url}
              alt={thing.images[0].altText}
              onError={imageError}
            />
          </LazyLoad>

          {thing.shortDescription !== "" ? (
            <p>
              <span className="todo_bold">Description:</span>{" "}
              {thing.shortDescription.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Description:</span> N/A
            </p>
          )}
          {thing.duration !== "" ? (
            <p>
              <span className="todo_bold">Duration:</span>{" "}
              {thing.duration.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Duration:</span> N/A
            </p>
          )}
          {thing.season.length > 0 ? (
            <p>
              <span className="todo_bold">Season:</span>{" "}
              {thing.season.join(", ")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Season:</span> N/A
            </p>
          )}
          {thing.seasonDescription !== "" ? (
            <p>
              <span className="todo_bold">Season Description:</span>{" "}
              {thing.seasonDescription.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Season Description:</span> N/A{" "}
            </p>
          )}
          {thing.feeDescription !== "" ? (
            <p>
              <span className="todo_bold">Fee:</span>{" "}
              {thing.feeDescription.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Fee:</span> N/A
            </p>
          )}
          {thing.accessibilityInformation !== "" ? (
            <p>
              <span className="todo_bold">Accessibility:</span>{" "}
              {thing.accessibilityInformation.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Accessibility:</span> N/A
            </p>
          )}
          {thing.reservationDescription !== "" ? (
            <p>
              <span className="todo_bold">Reservation:</span>{" "}
              {thing.reservationDescription.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Reservation:</span> N/A
            </p>
          )}
          {thing.petsDescription !== "" ? (
            <p>
              <span className="todo_bold">Pets:</span>{" "}
              {thing.petsDescription.replace(/(<([^>]+)>)/gi, "")}
            </p>
          ) : (
            <p>
              <span className="todo_bold">Pets:</span> N/A
            </p>
          )}
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
