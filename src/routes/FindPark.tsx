import React from "react";
import { Form } from "react-router-dom";
import "./FindPark.css";
import { stateCodes } from "../utilityData";

async function getPark(url: string) {
  const response = await fetch(url);
  const parkData = await response.json();
  console.log("parkData:", parkData);
  return parkData;
}

// getPark(
//   "https://developer.nps.gov/api/v1/parks?api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm"
// );

function FindPark() {
  return (
    <div className="FindPark">
      <h1>Find your park.</h1>
      <Form method="get" action="/find_park">
        <select id="states" name="states">
          {stateCodes.map((state, index) => (
            <option key={index} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default FindPark;

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm
