import * as React from "react";
import "./Videos.css";
import { useLoaderData } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

export async function loadVideos({ params }: any) {
  const videoResponse = await fetch(
    `https://developer.nps.gov/api/v1/multimedia/videos?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const videoData = await videoResponse.json();

  //   return { park: parkData.data, images: imageData.data };
  return videoData.data;
}

function Videos() {
  const data = useLoaderData() as ReturnType<any>;
  console.log("videoData:", data);

  const videoArr = data.map((video: any) => {
    return {
      type: "video",
      width: 1280,
      height: 720,
      title: video.title,
      //   description: video.description,
      poster: video.splashImage.url,
      sources: [
        {
          src: video.versions[0].url,
          type: "video/mp4",
        },
      ],
    };
  });

  return (
    <div className="Videos">
      <h1>Videos</h1>
      {/* <iframe
        src={`https://www.nps.gov/media/video/embed.htm?id=${data[0].id}`}
        src={`https://www.nps.gov/nps-audiovideo/audiovideo/28a52eac-59b3-462f-a17f-d4448dfb1334360p.mp4`}
        width="480"
        height="306"
        allowFullScreen
        title="hello"
        style={{ border: "none" }}
      ></iframe> */}
      <Lightbox
        plugins={[Video, Inline, Counter, Captions, Fullscreen]}
        slides={[...videoArr]}
        counter={{ style: { top: 24 } }}
        inline={{
          style: {
            margin: "0 auto",
            width: "100%",
            // maxWidth: "800px",
            aspectRatio: "3 / 2",
          },
        }}
      />
    </div>
  );
}

export default Videos;
