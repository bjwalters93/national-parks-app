import React from "react";
import "./FindPark.css";

async function getPark(url: string) {
  const response = await fetch(url);
  const parkData = await response.json();
  console.log("parkData:", parkData);
}

// getPark(
//   "https://developer.nps.gov/api/v1/parks?api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm"
// );

function FindPark() {
  return (
    <div className="FindPark">
      <h1>Find your park.</h1>
    </div>
  );
}

export default FindPark;

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm
