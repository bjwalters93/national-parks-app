import React from "react";
import "./FindPark.css";
import { stateCodes } from "../utilityData";
import { useLoaderData, Link, Form } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";

type parkListData = {
  stateCode: string;
  parkList: {
    parkCode: string;
    fullName: string;
    designation: string;
    states: string;
    description: string;
    images: { url: string; altText: string }[];
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

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function FindPark() {
  const FindPark_LD = useLoaderData() as parkListData;
  let parkArr: React.ReactElement[] = [];
  if (FindPark_LD !== null) {
    parkArr = FindPark_LD.parkList.map((park) => {
      return (
        <li className="li_find_park" key={park.parkCode}>
          <div style={{ margin: "0 50px 0 0" }}>
            <LazyLoad height={125} width={125} threshold={0.1}>
              <img
                src={park.images[0].url}
                alt={park.images[0].altText}
                className="li_find_park_image"
                onError={imageError}
              />
            </LazyLoad>
          </div>
          <div>
            <h3 className="li_titles">
              <Link
                className="park_links"
                to={"/park/" + FindPark_LD.stateCode + "/" + park.parkCode}
              >
                {park.fullName}
              </Link>
            </h3>
            <h4 className="li_designation">{park.designation}</h4>
            <p>
              <span>States:</span> {park.states}
            </p>
            <p>{park.description}</p>
          </div>
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
          className="select_el_find_park"
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
      {parkArr.length > 0 && <ul className="list_container">{parkArr}</ul>}
    </div>
  );
}

export default FindPark;

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm
