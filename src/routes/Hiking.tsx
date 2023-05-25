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
    designation: string;
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
  const [allTrailsError, setAllTrailsErr] = React.useState(false);
  console.log("Hiking_LD:", Hiking_LD);
  const state = Hiking_LD.park[0].addresses[0].stateCode;
  const city = Hiking_LD.park[0].addresses[0].city;
  const full = Hiking_LD.park[0].fullName;
  const stateObj: { name: string; code: string } | undefined = stateCodes.find(
    ({ code }) => code === state
  );

  const cityEncode = city.toLowerCase().split(" ").join("-");
  const stateEncode = stateObj?.name.toLowerCase().split(" ").join("-");
  const fullEncode = full.toLowerCase().split(" ").join("-");
  let allTrailsSrc: string;

  console.log("cityEncode:", cityEncode);
  console.log("stateEncode:", stateEncode);
  console.log("fullEncode:", fullEncode);

  if (Hiking_LD.park[0].designation === "National Park") {
    allTrailsSrc = `https://www.alltrails.com/widget/parks/us/${stateEncode}/${fullEncode}?u=i&sh=ziykwr`;
    console.log("allTrailsSrc:", allTrailsSrc);
  } else {
    allTrailsSrc = `https://www.alltrails.com/widget/us/${stateEncode}/${cityEncode}?u=i&sh=ziykwr`;
    console.log("allTrailsSrc:", allTrailsSrc);
  }

  async function testAllTrails() {
    const response = await fetch(allTrailsSrc, { mode: "no-cors" });
    console.log(response);
    const errorVal = response.status;
    console.log(errorVal);
    if (errorVal === 404) {
      setAllTrailsErr(true);
    }
  }

  React.useEffect(() => {
    testAllTrails();
  });

  return (
    <div className="Hiking">
      <h1 className="hiking__title">Hiking</h1>
      {!allTrailsError ? (
        <iframe
          className="alltrails"
          src={allTrailsSrc}
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"
        ></iframe>
      ) : (
        <p style={{ margin: "10px 0" }}>
          Sorry, an uknown error has occured. Sometimes the address isn't known
          to AllTrails or the map data may not be available. Try searching for
          the park on{" "}
          <a href="https://www.alltrails.com/" target="_blank" rel="noreferrer">
            All Trails.
          </a>
        </p>
      )}
    </div>
  );
}

export default Hiking;

// "https://www.alltrails.com/widget/parks/us/california/yosemite-national-park?u=i&sh=ziykwr";
