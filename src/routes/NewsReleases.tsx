import * as React from "react";
import "./NewsReleases.css";
import { Params, useLoaderData } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";

type newsReleasesData = {
  //   thingsToDo: {
  //     accessibilityInformation: string;
  //     feeDescription: string;
  //     images: { url: string; title: string; altText: string }[];
  //     petsDescription: string;
  //     reservationDescription: string;
  //     season: string[];
  //     seasonDescription: string;
  //     shortDescription: string;
  //     title: string;
  //     id: string;
  //     duration: string;
  //   }[];
};

export async function loadNewsReleases({
  params,
}: {
  params: Params;
}): Promise<newsReleasesData | null> {
  const thingsToDoResponse = await fetch(
    `https://developer.nps.gov/api/v1/thingstodo?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const thingsToDoData = await thingsToDoResponse.json();
  console.log(params.park);
  return { thingsToDo: thingsToDoData.data };
}

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function NewsReleases() {
  return <div className="NewsReleases">News Releases</div>;
}

export default NewsReleases;
