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

type parkData = {
  park: {
    activities: { name: string }[];
    addresses: {
      city: string;
      line1: string;
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
    entrancesPasses: { cost: string; description: string; title: string }[];
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
      }[];
    }[];
    states: string;
    topics: { name: string }[];
    weatherInfro: string;
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
    </div>
  );
}

export default Park;
