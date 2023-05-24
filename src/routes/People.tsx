import * as React from "react";
import "./People.css";
import { Params, useLoaderData } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";

type people = {
  people: {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    bodyText: string;
    id: string;
    listingDescription: string;
    quickFacts: {
      name: string;
      value: string;
    }[];
    images: {
      url: string;
      title: string;
      altText: string;
    }[];
  }[];
};

export async function loadPeople({
  params,
}: {
  params: Params;
}): Promise<people | null> {
  const peopleResponse = await fetch(
    `https://developer.nps.gov/api/v1/people?limit=5000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const peopleData = await peopleResponse.json();
  return { people: peopleData.data };
}

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function People() {
  const People_LD = useLoaderData() as people;
  console.log("People_LD:", People_LD.people);
  //   if People_LD.people.length > 0 ----- condition for rendering. if false "N/A"
  let peopleArr: React.ReactElement[] = [];
  if (People_LD.people.length > 0) {
    peopleArr = People_LD.people.map((person) => {
      const person_description = { __html: person.bodyText };
      return (
        <div className="person_container" key={person.id}>
          <h2>{person.title}</h2>
          <img
            className="person_img"
            src={person.images[0].url}
            alt={person.images[0].altText}
            onError={imageError}
          />
          <div dangerouslySetInnerHTML={person_description} />
        </div>
      );
    });
  }
  return (
    <div className="People">
      <h1 className="people__title">People</h1>
      {peopleArr.length > 0 ? (
        <div className="people_container">{peopleArr}</div>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
}

export default People;
