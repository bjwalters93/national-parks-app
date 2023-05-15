import React from "react";
import "./Park.css";
import { Params, useLoaderData, Link, useParams } from "react-router-dom";
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
import LazyLoad from "react-lazy-load";

type parkData = {
  park: {
    images: { url: string; altText: string; title: string; caption: string }[];
    fullName: string;
    description: string;
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
  //   window.scrollTo(0, 0);
  const Park_LD = useLoaderData() as parkData;
  const Park_params = useParams();
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

  const imagesArr3: {
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

  const combinedImagesArr: any = [...imagesArr1, ...imagesArr2];

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
        // index={5}
      /> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          //   height: "500px",
          //   overflowY: "scroll",
          justifyContent: "center",
        }}
      >
        {imagesArr3.map((image) => {
          return (
            <LazyLoad height={340} width={440} threshold={0.55}>
              <img
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                  display: "block",
                  border: "10px solid black",
                  margin: "20px",
                  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
                }}
                src={image.src}
                alt={image.alt}
              />
            </LazyLoad>
          );
        })}
      </div>
    </div>
  );
}

export default Park;
