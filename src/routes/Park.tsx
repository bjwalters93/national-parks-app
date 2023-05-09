import React from "react";
import "./Park.css";
import { useLoaderData, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export async function loadPark({ params }: any) {
  const response1 = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const parkData = await response1.json();

  const response2 = await fetch(
    `https://developer.nps.gov/api/v1/multimedia/galleries?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const imageData = await response2.json();
  return { park: parkData.data, images: imageData.data };
}

function Park() {
  const [open, setOpen] = React.useState(false);
  const data = useLoaderData() as ReturnType<any>;
  console.log("data:", data);
  const imagesArr1 = data.images.map((image: any, index: any) => {
    return (
      <div className="gallery">
        <a target="_blank" rel="noreferrer" href={image.images[0].url}>
          <img
            className="image_class"
            src={image.images[0].url}
            alt={image.images[0].altText}
          />
        </a>
        {/* <div className="desc">{image.images[0].title}</div> */}
      </div>
    );
  });
  //   const imagesArr2 = park[0].images.map((image: any, index: any) => {
  //     return (
  //       <div key={index}>
  //         <img src={image.url} alt={image.altText} style={{ width: "500px" }} />
  //       </div>
  //     );
  //   });
  const imagesArr3 = data.images.map((image: any, index: any) => {
    return { src: image.images[0].url };
  });

  console.log(imagesArr3);

  return (
    <div className="Park">
      <h1>{data.park[0].fullName}</h1>
      <p>{data.park[0].description}</p>
      {/* <div className="gallery_container">{imagesArr1}</div> */}
      <button type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button>

      <Lightbox
        plugins={[Thumbnails]}
        open={open}
        close={() => setOpen(false)}
        slides={[...imagesArr3]}
      />
    </div>
  );
}

export default Park;
