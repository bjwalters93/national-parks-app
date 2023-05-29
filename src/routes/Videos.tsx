import * as React from "react";
import "./Videos.css";
import { Params, useLoaderData } from "react-router-dom";
// import Lightbox, { Slide } from "yet-another-react-lightbox";
// import Video from "yet-another-react-lightbox/plugins/video";
// import Inline from "yet-another-react-lightbox/plugins/inline";
// import Counter from "yet-another-react-lightbox/plugins/counter
// import Captions from "yet-another-react-lightbox/plugins/captions";
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
  const [inputHeight, setInputHeight] = React.useState<number>();
  const inputRef = React.useRef<HTMLDivElement>(null);
  const Videos_LD = useLoaderData() as videoData;
  console.log("Videos_LD:", Videos_LD);
  const [index, setIndex] = React.useState(0);

  const videoArr = Videos_LD.map((video) => {
    return {
      title: video.title,
      descripion: video.description,
      src: video.versions[0] === undefined ? "" : video.versions[0].url,
    };
  });

  console.log("videoArr:", videoArr);

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

  return (
    <div className="Videos">
      <h1 style={{ marginBottom: "0", marginTop: "0" }}>Videos</h1>
      <p style={{ margin: "0 0 10px 0" }}>{videoArr.length} Videos</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "75%" }} ref={inputRef}>
          <video
            className="videos_video"
            src={videoArr[index].src}
            controls
            onLoadedData={() => setInputHeight(inputRef.current?.clientHeight)}
          />
        </div>
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
          {inputHeight !== undefined &&
            Videos_LD.map((video, index) => {
              return (
                <div
                  style={{
                    borderBottom: "1px solid black",
                    cursor: "pointer",
                  }}
                  onClick={() => setIndex(index)}
                  key={index}
                >
                  <h3 className="videos_list_h3">
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
      <h2 className="title_video_main">
        {index + 1}/{videoArr.length} - {videoArr[index].title}
      </h2>
      <p>{videoArr[index].descripion}</p>
    </div>
  );
}

// function Videos() {
//   const [inputHeight, setInputHeight] = React.useState<number>();
//   const inputRef = React.useRef<HTMLDivElement>(null);
//   const Videos_LD = useLoaderData() as videoData;
//   console.log("Videos_LD:", Videos_LD);
//   const [index, setIndex] = React.useState(0);
//   const videoArr: Slide[] = Videos_LD.map((video) => {
//     return {
//       type: "video",
//       width: 1280,
//       height: 720,
//       title: video.title,
//       //   description: video.description,
//       poster: video.splashImage.url,
//       sources: [
//         {
//           src: video.versions[0] === undefined ? "" : video.versions[0].url,
//           type: "video/mp4",
//         },
//       ],
//     };
//   });

//   React.useEffect(() => {
//     setInputHeight(inputRef.current?.clientHeight);
//     const handleWindowResize = (e: UIEvent) => {
//       setInputHeight(inputRef.current?.clientHeight);
//     };

//     window.addEventListener("resize", handleWindowResize);
//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   return (
//     <div className="Videos">
//       <h1 style={{ marginBottom: "0", marginTop: "0" }}>Videos</h1>
//       <p style={{ margin: "0 0 10px 0" }}>{videoArr.length} Videos</p>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           msFlex: 1,
//           flex: 1,
//         }}
//       >
//         <div style={{ width: "75%" }} ref={inputRef}>
//           <Lightbox
//             plugins={[Video, Inline, Counter, Captions]}
//             slides={[...videoArr]}
//             counter={{ style: { top: 24 } }}
//             inline={{
//               style: {
//                 // width: "75%",
//                 aspectRatio: "3 / 2",
//               },
//             }}
//             index={index}
//           />
//         </div>
//         <div
//           style={{
//             width: "25%",
//             overflowY: "scroll",
//             padding: "0 20px",
//             height:
//               inputHeight === undefined
//                 ? inputRef.current?.clientHeight
//                 : inputHeight,
//           }}
//         >
//           {inputHeight !== undefined &&
//             Videos_LD.map((video, index) => {
//               return (
//                 <div
//                   style={{
//                     borderBottom: "1px solid black",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setIndex(index)}
//                   key={index}
//                 >
//                   <h3
//                     style={{
//                       margin: "10px 0 5px 0",
//                       fontSize: "14px",
//                       lineHeight: "1.2",
//                       fontWeight: "500",
//                     }}
//                   >
//                     {index + 1}/{videoArr.length} - {video.title}
//                   </h3>
//                   <p style={{ margin: "0 0 10px 0", fontSize: "12px" }}>
//                     {video.description}
//                   </p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }

export default Videos;
