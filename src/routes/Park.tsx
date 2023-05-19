import React from "react";
import "./Park.css";
import { Params, useLoaderData } from "react-router-dom";
import { stateCodes } from "../utilityData";
import ImageGallery from "../secondary_components/ImageGallery";
import ImageGalleryMQ from "../secondary_components/ImageGalleryMQ";
import { viewportContext } from "./RootComponent";
import scrollIconsResize from "../images/scrollIconsResize.png";

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// DO THIS RATHER THAN CONDITIONAL RENDERING IF POSSIBLE
// WHY ?? NO NEED TO LISTEN TO SCREEN SIZE
// Change the CSS display property depending on the screen size.
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

type parkData = {
  park: {
    activities: { name: string }[];
    addresses: {
      city: string;
      line1: string;
      line2: string;
      line3: string;
      postalCode: string;
      stateCode: string;
    }[];
    contacts: {
      phoneNumbers: {
        phoneNumber: string;
      }[];
    };
    description: string;
    designation: string;
    directionsInfo: string;
    entranceFees: { cost: string; description: string; title: string }[];
    entrancePasses: { cost: string; description: string; title: string }[];
    fullName: string;
    images: { url: string; altText: string; title: string; caption: string }[];
    operatingHours: {
      description: string;
      name: string;
      standardHours: {
        sunday: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
      };
    }[];
    states: string;
    topics: { name: string }[];
    weatherInfo: string;
  }[];
  images: {
    title: string;
    altText: string;
    description: string;
    fileInfo: {
      url: string;
    };
  }[];
};

export async function loadPark({
  params,
}: {
  params: Params;
}): Promise<parkData | null> {
  const parkResponse = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await parkResponse.json();
  const imageResponse = await fetch(
    `https://developer.nps.gov/api/v1/multimedia/galleries/assets?limit=5000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const imageData = await imageResponse.json();
  return { park: parkData.data, images: imageData.data };
}

function Park() {
  const Park_LD = useLoaderData() as parkData;
  const viewportWidth = React.useContext(viewportContext) as { width: number };
  const breakpoint = 600;
  console.log(Park_LD);

  const imagesArr1: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[] = Park_LD.park[0].images.map((image) => {
    return {
      src: image.url,
      alt: image.altText,
      title: image.title,
      description: image.caption,
    };
  });

  const imagesArr2: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[] = Park_LD.images.map((image) => {
    return {
      src: image.fileInfo.url,
      alt: image.altText,
      title: image.title,
      description: image.description,
    };
  });

  const combinedImagesArr = [...imagesArr1, ...imagesArr2];

  return (
    <div className="Park">
      <h1 className="park__title">{Park_LD.park[0].fullName}</h1>
      <p>{Park_LD.park[0].description}</p>
      <h2 style={{ marginBottom: "0" }}>Photo Album</h2>
      <p
        style={{
          marginTop: "0",
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <img
          src={scrollIconsResize}
          alt="scroll icons"
          style={{
            height: "30px",
            marginRight: "5px",
          }}
        />
        {combinedImagesArr.length} Images (scroll) <br />
        Click to zoom
      </p>
      {viewportWidth.width > breakpoint && (
        <ImageGallery combinedImagesArr={combinedImagesArr} />
      )}
      {viewportWidth.width < breakpoint && (
        <ImageGalleryMQ combinedImagesArr={combinedImagesArr} />
      )}
      <h2>Park Information</h2>
      <p className="left_margin_park_info">
        <span className="span_bold_1">Designation:</span>{" "}
        {Park_LD.park[0].designation === ""
          ? "N/A"
          : Park_LD.park[0].designation}
      </p>
      <p className="left_margin_park_info">
        <span className="span_bold_1">States:</span>{" "}
        {Park_LD.park[0].states
          ? Park_LD.park[0].states
              .split(",")
              .map((el) => {
                let state = stateCodes.find(({ code }) => code === el) as {
                  name: string;
                };
                return state.name;
              })
              .join(", ")
          : "N/A"}
      </p>
      <p className="left_margin_park_info">
        <span className="span_bold_1">Phone Number:</span>{" "}
        {Park_LD.park[0].contacts.phoneNumbers.length > 0
          ? Park_LD.park[0].contacts.phoneNumbers[0].phoneNumber
          : "N/A"}
      </p>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Address:</span>{" "}
        </p>
        {Park_LD.park[0].addresses.length > 0 ? (
          <ul>
            <li>{Park_LD.park[0].addresses[0].line1}</li>
            <li>{Park_LD.park[0].addresses[0].line2}</li>
            <li>{Park_LD.park[0].addresses[0].line3}</li>
            <li>{Park_LD.park[0].addresses[0].city}</li>
            <li>{Park_LD.park[0].addresses[0].stateCode}</li>
            <li>{Park_LD.park[0].addresses[0].postalCode}</li>
          </ul>
        ) : (
          "N/A"
        )}
      </div>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Operating Hours:</span>{" "}
          {Park_LD.park[0].operatingHours.length > 0 ? null : "N/A"}
        </p>
        {Park_LD.park[0].operatingHours.map((el, index) => {
          return (
            <ul style={{ marginBottom: "10px" }} key={index}>
              <li>
                <span className="span_bold_2">{el.name}</span>
              </li>
              <li>{el.description}</li>
              <ul>
                <li>
                  <span className="span_bold_2">Sunday:</span>{" "}
                  {el.standardHours.sunday}
                </li>
                <li>
                  <span className="span_bold_2">Monday:</span>{" "}
                  {el.standardHours.monday}
                </li>
                <li>
                  <span className="span_bold_2">Tuesday:</span>{" "}
                  {el.standardHours.tuesday}
                </li>
                <li>
                  <span className="span_bold_2">Wednesday:</span>{" "}
                  {el.standardHours.wednesday}
                </li>
                <li>
                  <span className="span_bold_2">Thursday:</span>{" "}
                  {el.standardHours.thursday}
                </li>
                <li>
                  <span className="span_bold_2">Friday:</span>{" "}
                  {el.standardHours.friday}
                </li>
                <li>
                  <span className="span_bold_2">Saturday:</span>{" "}
                  {el.standardHours.saturday}
                </li>
              </ul>
            </ul>
          );
        })}
      </div>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Activities:</span>{" "}
          {Park_LD.park[0].activities.length > 0 ? null : "N/A"}
          {Park_LD.park[0].activities
            .map((el) => {
              return el.name;
            })
            .join(", ")}
        </p>
      </div>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Topics:</span>{" "}
          {Park_LD.park[0].topics.length > 0 ? null : "N/A"}
          {Park_LD.park[0].topics
            .map((el) => {
              return el.name;
            })
            .join(", ")}
        </p>
      </div>
      <p className="left_margin_park_info">
        <span className="span_bold_1">Directions Info:</span>{" "}
        {Park_LD.park[0].directionsInfo}
      </p>
      <p className="left_margin_park_info">
        <span className="span_bold_1">Weather Info:</span>{" "}
        {Park_LD.park[0].weatherInfo}
      </p>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Entrance Fees:</span>{" "}
          {Park_LD.park[0].entranceFees.length > 0 ? null : "N/A"}
        </p>
        {Park_LD.park[0].entranceFees.map((el, index) => {
          return (
            <ul style={{ marginBottom: "10px" }} key={index}>
              <li>
                <span className="span_bold_2">{el.title}</span>
              </li>
              <li>${el.cost}</li>
              <li>{el.description}</li>
            </ul>
          );
        })}
      </div>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Entrance Passes:</span>{" "}
          {Park_LD.park[0].entrancePasses.length > 0 ? null : "N/A"}
        </p>
        {Park_LD.park[0].entrancePasses.map((el, index) => {
          return (
            <ul style={{ marginBottom: "10px" }} key={index}>
              <li>
                <span className="span_bold_2">{el.title}</span>
              </li>
              <li>${el.cost}</li>
              <li>{el.description}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Park;

// {/* <Lightbox
//   plugins={[Inline, Thumbnails, Captions, Counter, Fullscreen]}
//   counter={{ style: { top: 24 } }}
//   inline={{
//     style: {
//       margin: "0 auto",
//       width: "100%",
//       // maxWidth: "800px",
//       aspectRatio: "3 / 2",
//     },
//   }}
//   slides={[...combinedImagesArr]}
// />; */}
