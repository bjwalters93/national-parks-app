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
  description: string;
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
  const Videos_LD = useLoaderData() as videoData;
  console.log("Videos_LD:", Videos_LD);
  const [index, setIndex] = React.useState(0);
  const videoArr: Slide[] = Videos_LD.map((video) => {
    return {
      type: "video",
      width: 1280,
      height: 720,
      title: video.title,
      //   description: video.description,
      poster: video.splashImage.url,
      sources: [
        {
          src: video.versions[0] === undefined ? "" : video.versions[0].url,
          type: "video/mp4",
        },
      ],
    };
  });

  return (
    <div className="Videos">
      <h1 style={{ marginBottom: "0" }}>Videos</h1>
      <p style={{ margin: "0 0 10px 0" }}>{videoArr.length} Videos</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          msFlex: 1,
          flex: 1,
        }}
      >
        <Lightbox
          plugins={[Video, Inline, Counter, Captions, Fullscreen]}
          slides={[...videoArr]}
          counter={{ style: { top: 24 } }}
          inline={{
            style: {
              //   margin: "0 auto",
              width: "75%",
              aspectRatio: "3 / 2",
            },
          }}
          index={index}
        />
        <div
          style={{
            width: "25%",
            overflowY: "scroll",
            padding: "0 20px",
            height: "min-content",
          }}
        >
          {Videos_LD.map((video, index) => {
            return (
              <div
                style={{
                  borderBottom: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => setIndex(index)}
                key={index}
              >
                <h3
                  style={{
                    margin: "10px 0 5px 0",
                    fontSize: "14px",
                    lineHeight: "1.2",
                    fontWeight: "500",
                  }}
                >
                  {index + 1}/{videoArr.length} - {video.title}
                </h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px" }}>
                  {video.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Videos;
