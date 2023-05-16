import React from "react";
import "./Park.css";
import { Params, useLoaderData, Link, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Inline from "yet-another-react-lightbox/plugins/inline";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import arrowIcon from "../images/arrowIcon.png";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";
import { stateCodes } from "../utilityData";

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

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function Park() {
  const Park_LD = useLoaderData() as parkData;
  const Park_params = useParams();
  console.log(Park_LD);
  const [index, setIndex] = React.useState(-1);

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
      <div className="backlink__container">
        <Link
          to={`/find_park?state=${Park_params.stateCode}`}
          className="back__link"
        >
          <img src={arrowIcon} alt="back arrow" height="10px" />
          <span className="back__text">Back to Find Park</span>
        </Link>
      </div>

      <h1 className="park__title">{Park_LD.park[0].fullName}</h1>
      <p>{Park_LD.park[0].description}</p>
      <h2 style={{ marginBottom: "0" }}>Photo Album</h2>
      <p style={{ marginTop: "0" }}>{combinedImagesArr.length} Images</p>
      <div className="image_gallery_container">
        {combinedImagesArr.map((image, index) => {
          return (
            <LazyLoad key={index} height={220} width={220} threshold={0.1}>
              <img
                className="gallery_images"
                src={image.src}
                alt={image.alt}
                onClick={() => {
                  setIndex(index);
                }}
                onError={imageError}
              />
            </LazyLoad>
          );
        })}
        <Lightbox
          slides={[...combinedImagesArr]}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Counter, Captions]}
          counter={{ style: { top: 24 } }}
        />
      </div>
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
        {Park_LD.park[0].contacts.phoneNumbers[0].phoneNumber}
      </p>
      <div className="left_margin_park_info">
        <p style={{ marginBottom: "0px" }}>
          <span className="span_bold_1">Address:</span>{" "}
        </p>
        <ul>
          <li>{Park_LD.park[0].addresses[0].line1}</li>
          <li>{Park_LD.park[0].addresses[0].line2}</li>
          <li>{Park_LD.park[0].addresses[0].line3}</li>
          <li>{Park_LD.park[0].addresses[0].city}</li>
          <li>{Park_LD.park[0].addresses[0].stateCode}</li>
          <li>{Park_LD.park[0].addresses[0].postalCode}</li>
        </ul>
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
      {/* <Lightbox
        plugins={[Inline, Thumbnails, Captions, Counter, Fullscreen]}
        counter={{ style: { top: 24 } }}
        inline={{
          style: {
            margin: "0 auto",
            width: "100%",
            // maxWidth: "800px",
            aspectRatio: "3 / 2",
          },
        }}
        slides={[...combinedImagesArr]}
      /> */}
    </div>
  );
}

export default Park;
