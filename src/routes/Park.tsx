import React from "react";
import "./Park.css";
import { Params, useLoaderData, Link, useLocation } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import arrowIcon from "../images/arrowIcon.png";

type parkData = {
  park: {
    images: { url: string; altText: string; title: string; caption: string }[];
    fullName: string;
    description: string;
  }[];
  images: {
    images: {
      url: string;
      altText: string;
      title: string;
      description: string;
    }[];
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
    `https://developer.nps.gov/api/v1/multimedia/galleries?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const imageData = await imageResponse.json();
  return { park: parkData.data, images: imageData.data };
}

function Park() {
  const parkData = useLoaderData() as parkData;
  const linkState = useLocation();
  const backLinkValue = linkState.state.currentStateCode;
  console.log("backLinkValue:", backLinkValue);
  console.log("parkData:", parkData);

  const imagesArr1: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[] = parkData.park[0].images.map((image) => {
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
  }[] = parkData.images.map((image) => {
    return {
      src: image.images[0].url,
      alt: image.images[0].altText,
      title: image.images[0].title,
      description: image.images[0].description,
    };
  });

  const combinedImagesArr = [...imagesArr1, ...imagesArr2];

  return (
    <div className="Park">
      <div className="backlink__container">
        <Link to={`/find_park?state=${backLinkValue}`} className="back__link">
          <img src={arrowIcon} alt="back arrow" height="10px" />
          <span className="back__text">Back to Find Park</span>
        </Link>
      </div>

      <h1 className="park__title">{parkData.park[0].fullName}</h1>
      <p>{parkData.park[0].description}</p>
      <Lightbox
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
      />
    </div>
  );
}

export default Park;
