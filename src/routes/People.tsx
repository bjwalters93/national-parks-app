import * as React from "react";
import "./People.css";
import { Params, useLoaderData } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import expandArrow from "../images/expandArrow.png";

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

function People() {
  const People_LD = useLoaderData() as people;
  console.log("People_LD:", People_LD.people);
  const [trackPerson, setTrackPerson] = React.useState<string | null>(null);
  const refs: any = React.useRef([]);
  let peopleArr: React.ReactElement[] = [];
  if (People_LD.people.length > 0) {
    peopleArr = People_LD.people.map((person, index) => {
      const person_description = { __html: person.bodyText };
      return (
        <div className="person_container" key={person.id}>
          <h2
            ref={(element) => {
              refs.current[index] = element;
            }}
            onClick={() => {
              if (trackPerson === null) {
                setTrackPerson(person.id);
              } else if (trackPerson !== null && trackPerson !== person.id) {
                setTrackPerson(person.id);
              } else {
                setTrackPerson(null);
              }
              setTimeout(() => {
                refs.current[index].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);
            }}
          >
            {person.title}
            <img
              src={expandArrow}
              alt="expand arrow"
              className={
                trackPerson !== person.id ? "expand_arrow" : "transform_arrow"
              }
            />
          </h2>
          <div
            className={
              trackPerson === person.id ? "person_expand" : "person_retract"
            }
          >
            {person.images[0].url !== "" && (
              <LazyLoad width="90%" threshold={0.1} className="person_img_cont">
                <img
                  className="person_img"
                  src={person.images[0].url}
                  alt={person.images[0].altText}
                />
              </LazyLoad>
            )}
            <div dangerouslySetInnerHTML={person_description} />
          </div>
        </div>
      );
    });
  }
  return (
    <div className="People">
      <h1 className="people__title">People</h1>
      <p>A list of people related to this park.</p>
      {peopleArr.length > 0 ? (
        <div className="people_container">{peopleArr}</div>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
}

export default People;
