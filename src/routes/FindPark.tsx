import React from "react";
import { Form } from "react-router-dom";
import "./FindPark.css";
import { stateCodes } from "../utilityData";
import { useLoaderData, Link } from "react-router-dom";

type parkListData = {
  parkCode: string;
  fullName: string;
}[];

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
    return parksData.data;
  } else return null;
}

function FindPark() {
  const parksList = useLoaderData() as parkListData;
  console.log("parksList:", parksList);
  let parkArr: React.ReactElement[] = [];
  if (parksList !== null) {
    parkArr = parksList.map((park) => {
      return (
        <li key={park.parkCode}>
          <Link to={"/park/" + park.parkCode}>{park.fullName}</Link>
        </li>
      );
    });
  }
  return (
    <div className="FindPark">
      <h1>Find your park.</h1>
      <Form method="get" action="/find_park">
        <select id="state" name="state">
          {stateCodes.map((state, index) => (
            <option key={index} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </Form>
      {parkArr.length > 0 && <ul>{parkArr}</ul>}
    </div>
  );
}

export default FindPark;

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm
