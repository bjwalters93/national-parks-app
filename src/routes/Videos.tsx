import * as React from "react";
import "./Videos.css";
import { Params, useLoaderData } from "react-router-dom";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

type videoData = {
  title: string;
  versions: { url: string }[];
  splashImage: { url: string };
}[];

export async function loadVideos({
  params,
}: {
  params: Params;
}): Promise<videoData> {
  const videoResponse = await fetch(
    `https://developer.nps.gov/api/v1/multimedia/videos?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const videoData = await videoResponse.json();
  return videoData.data;
}

function Videos() {
  const videoData = useLoaderData() as videoData;
  console.log("videoData:", videoData);

  const videoArr: Slide[] = videoData.map((video) => {
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

  console.log("videoArr:", videoArr);

  return (
    <div className="Videos">
      <h1>Videos</h1>
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
