import React, { ReactElement } from "react";
import { Form } from "react-router-dom";
import "./FindPark.css";
import { stateCodes } from "../utilityData";
import { useLoaderData, Link } from "react-router-dom";

export async function getPark({
  request,
}: {
  request: Request;
}): Promise<ParkData | null> {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("state");
  if (searchTerm !== null) {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?limit=1000&stateCode=${searchTerm}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
    );
    const parksData = await response.json();
    try {
      assertParkData(parksData.data);
      return parksData.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  } else return null;
}

type ParkData = {
  parkCode: string;
  fullName: string;
}[];

function assertParkData(arg: unknown): asserts arg is ParkData {
  if (typeof arg !== "object") {
    throw new Error('Arg is not of type "ParkData"!!!');
  }

  if (arg && (!("parkCode" in arg) || !("fullName" in arg))) {
    throw new Error('Arg is not of type "ParkData"!!!');
  }

  if (
    arg &&
    (typeof arg.parkCode !== "string" || typeof arg.fullName !== "string")
  ) {
    throw new Error('Arg is not of type "ParkData"!!!');
  }
}

function FindPark() {
  const parks = useLoaderData() as ParkData;
  assertParkData(parks);
  console.log("parksLoaderData:", parks);
  let parkArr: ReactElement[] = [];
  if (parks !== null) {
    parkArr = parks.map((park) => {
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
