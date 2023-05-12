import React from "react";
import "./FindPark.css";
import { stateCodes } from "../utilityData";
import { useLoaderData, Link, Form } from "react-router-dom";

type parkListData = {
  stateCode: string;
  parkList: {
    parkCode: string;
    fullName: string;
  }[];
};

export async function getPark({
  request,
}: {
  request: Request;
}): Promise<parkListData | null> {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("state");
  if (searchTerm !== null) {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?limit=1000&stateCode=${searchTerm}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
    );
    const parksData = await response.json();
    return { stateCode: searchTerm, parkList: parksData.data };
  } else return null;
}

function FindPark() {
  const FindPark_LD = useLoaderData() as parkListData;
  let parkArr: React.ReactElement[] = [];
  if (FindPark_LD !== null) {
    parkArr = FindPark_LD.parkList.map((park) => {
      return (
        <li key={park.parkCode}>
          <Link to={"/park/" + FindPark_LD.stateCode + "/" + park.parkCode}>
            {park.fullName}
          </Link>
        </li>
      );
    });
  }
  return (
    <div className="FindPark">
      <h1>Find your park.</h1>
      <h2>Select a State</h2>
      <Form method="get" action="/find_park">
        <select
          id="state"
          name="state"
          defaultValue={FindPark_LD !== null ? FindPark_LD.stateCode : ""}
        >
          {stateCodes.map((state, index) => (
            <option key={index} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <button className="submit_state_btn" type="submit">
          Submit
        </button>
      </Form>
      {parkArr.length > 0 && <ul>{parkArr}</ul>}
    </div>
  );
}

export default FindPark;

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm
