import * as React from "react";
import "./Videos.css";
import { Params, useLoaderData } from "react-router-dom";
import { viewportContext } from "./RootComponent";

type videoData = {
  title: string;
  description: string;
  versions: { url: string }[];
  splashImage: { url: string };
  id: string;
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
  const [inputHeight, setInputHeight] = React.useState<number>();
  const inputRef = React.useRef<HTMLDivElement>(null);
  const Videos_LD = useLoaderData() as videoData;
  const [index, setIndex] = React.useState(0);
  const [listTracker, setListTracker] = React.useState<number>(0);
  const viewportWidth = React.useContext(viewportContext) as {
    width: number;
  };
  const breakpoint = 800;

  const videoArr = Videos_LD.map((video) => {
    return {
      title: video.title,
      descripion: video.description,
      src: video.versions[0] === undefined ? "" : video.versions[0].url,
    };
  });

  React.useEffect(() => {
    setInputHeight(inputRef.current?.clientHeight);
    const handleWindowResize = (e: UIEvent) => {
      setInputHeight(inputRef.current?.clientHeight);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (Videos_LD.length === 0) {
    return (
      <div className="Videos">
        <h1 style={{ marginBottom: "0", marginTop: "0" }}>Videos</h1>
        <p style={{ margin: "0 0 10px 0" }}>{videoArr.length} Videos</p>
        <p>Sorry, there are currently no videos for this park.</p>
      </div>
    );
  } else {
    return (
      <div className="Videos">
        <h1 className="videos__title">Videos</h1>
        <p style={{ margin: "0 0 10px 0" }}>{videoArr.length} Videos</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: viewportWidth.width > breakpoint ? "75%" : "100%",
            }}
            ref={inputRef}
          >
            <video
              className="videos_video"
              src={videoArr[index].src}
              controls
              onLoadedData={() =>
                setInputHeight(inputRef.current?.clientHeight)
              }
            />
          </div>
          {inputHeight !== undefined && viewportWidth.width > breakpoint && (
            <div
              style={{
                width: "25%",
                overflowY: "scroll",
                padding: "0 20px",
                height:
                  inputHeight === undefined
                    ? inputRef.current?.clientHeight
                    : inputHeight,
              }}
            >
              {Videos_LD.map((video, index) => {
                return (
                  <div
                    className={
                      listTracker === index
                        ? "video_list_item_select"
                        : "video_list_item"
                    }
                    onClick={() => {
                      setIndex(index);
                      setListTracker(index);
                    }}
                    key={index}
                  >
                    <h3 className="videos_list_h3">
                      {index + 1}/{videoArr.length} - {video.title}
                    </h3>
                    <p
                      className="video_list_p"
                      style={{ margin: "0 0 10px 0", fontSize: "12px" }}
                    >
                      {video.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="video_descrip_box">
          <h2 className="title_video_main">{videoArr[index].title}</h2>
          <p>{videoArr[index].descripion}</p>
        </div>
        {inputHeight !== undefined && viewportWidth.width <= breakpoint && (
          <div
            style={{
              overflowY: "scroll",
              padding: "0 20px",
              maxHeight: "300px",
              // marginTop: "10px",
            }}
          >
            {Videos_LD.map((video, index) => {
              return (
                <div
                  className={
                    listTracker === index
                      ? "video_list_item_select"
                      : "video_list_item"
                  }
                  onClick={() => {
                    setIndex(index);
                    setListTracker(index);
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 500);
                  }}
                  key={index}
                >
                  <h3 className="videos_list_h3">
                    {index + 1}/{videoArr.length} - {video.title}
                  </h3>
                  <p
                    className="video_list_p"
                    style={{ margin: "0 0 10px 0", fontSize: "12px" }}
                  >
                    {video.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Videos;
