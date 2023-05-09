import React from "react";
// import "./Park.css";
// import { useLoaderData, Link } from "react-router-dom";

export async function loadPark({ request, params }: any) {
  console.log("params:", params);
  //   let url = new URL(request.url);
  //   let searchTerm = url.searchParams.get("state");
  //   if (searchTerm !== null) {
  //     const response = await fetch(
  //       `https://developer.nps.gov/api/v1/parks?limit=1000&stateCode=${searchTerm}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  //     );
  //     const parkData = await response.json();
  //     return parkData.data;
  //   } else return null;
}

function Park() {
  return (
    <div className="Park">
      <h1>Park goes here!!</h1>
    </div>
  );
}

export default Park;
