import * as React from "react";
import "./ImageGallery.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import LazyLoad from "react-lazy-load";
import ImageError from "../images/ImageError.png";

type componentProps = {
  combinedImagesArr: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
};

function imageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.src = ImageError;
}

function ImageGallery({ combinedImagesArr }: componentProps) {
  const [index, setIndex] = React.useState(-1);

  return (
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
        styles={{
          container: { fontFamily: "'Kanit', sans-serif" },
          captionsTitle: { fontSize: "14px" },
          captionsDescription: { fontSize: "12px" },
        }}
        slides={[...combinedImagesArr]}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Counter, Captions, Zoom]}
        counter={{ style: { top: 16, fontSize: "12px" } }}
        zoom={{ maxZoomPixelRatio: 10 }}
        animation={{ zoom: 200 }}
      />
    </div>
  );
}

export default ImageGallery;
