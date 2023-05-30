import * as React from "react";
import "./Directions.css";
import { Params, useLoaderData } from "react-router-dom";

type parkData = {
  fullName: string;
  addresses: {
    city: string;
    line1: string;
    line2: string;
    line3: string;
    postalCode: string;
    stateCode: string;
    type: string;
  }[];
}[];

export async function loadDirections({
  params,
}: {
  params: Params;
}): Promise<parkData> {
  const parkResponse = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await parkResponse.json();
  return parkData.data;
}

function Directions() {
  const Directions_LD = useLoaderData() as parkData;
  const mapAddress = Directions_LD[0].addresses;

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

  return (
    <div className="Directions">
      <h1 style={{ marginTop: "0" }}>Directions</h1>
      <div className="directions_content">
        <iframe
          title="directions"
          width="100%"
          height="600px"
          loading="lazy"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA9haWt2RZPcj4Dbl2xy3u1IigLmlQ-JTc&q=${mapUrlString}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Directions;

//   URL-escaped place name, address, plus code, or place ID.
//   The Maps Embed API supports both + and %20 when escaping spaces.
//   For example, convert "City Hall, New York, NY" to City+Hall,New+York,NY,
//   or plus codes "849VCWC8+R9" to 849VCWC8%2BR9.

//   https://www.google.com/maps/embed/v1/place
//   ?key=YOUR_API_KEY
//   &q=Eiffel+Tower,Paris+France
