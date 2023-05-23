import * as React from "react";
import "./Hiking.css";
import { Params, useLoaderData } from "react-router-dom";
import { stateCodes } from "../utilityData";

type hikingData = {
  park: {
    fullName: string;
    latitude: string;
    longitude: string;
    addresses: { city: string; stateCode: string }[];
  }[];
};

export async function loadHiking({
  params,
}: {
  params: Params;
}): Promise<hikingData | null> {
  const parkResponse = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await parkResponse.json();
  console.log(params.park);
  return { park: parkData.data };
}

function Hiking() {
  const Hiking_LD = useLoaderData() as hikingData;
  console.log("Hiking_LD:", Hiking_LD);
  const state = Hiking_LD.park[0].addresses[0].stateCode;
  const city = Hiking_LD.park[0].addresses[0].city;
  const stateObj: { name: string; code: string } | undefined = stateCodes.find(
    ({ code }) => code === state
  );

  const cityEncode = city.toLowerCase().split(" ").join("-");
  const stateEncode = stateObj?.name.toLowerCase().split(" ").join("-");

  console.log("cityEncode:", cityEncode);
  console.log("stateEncode:", stateEncode);

  return (
    <div className="Hiking">
      <h1 className="hiking__title">Hiking</h1>
      <iframe
        className="alltrails"
        src={`https://www.alltrails.com/widget/us/${stateEncode}/${cityEncode}?u=i&sh=ziykwr`}
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"
      ></iframe>
    </div>
  );
}

export default Hiking;
