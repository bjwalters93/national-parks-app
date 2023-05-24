import * as React from "react";
import "./NewsReleases.css";
import { Params, useLoaderData } from "react-router-dom";

type newsReleasesData = {
  newsReleases: {
    abstract: string;
    image: {
      title: string;
      altText: string;
      url: string;
    };
    releaseDate: string;
    title: string;
    id: string;
    url: string;
  }[];
};

export async function loadNewsReleases({
  params,
}: {
  params: Params;
}): Promise<newsReleasesData | null> {
  const newsReleaseResponse = await fetch(
    `https://developer.nps.gov/api/v1/newsreleases?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const newsReleaseData = await newsReleaseResponse.json();
  return { newsReleases: newsReleaseData.data };
}

function NewsReleases() {
  const NewsReleases_LD = useLoaderData() as newsReleasesData;
  let newsReleasesArr: React.ReactElement[] = [];
  if (NewsReleases_LD.newsReleases.length > 0) {
    newsReleasesArr = NewsReleases_LD.newsReleases.map((article) => {
      return (
        <div className="article_container" key={article.id}>
          <h2>{article.title}</h2>
          <p>
            <span className="news_bold">Release Date:</span>{" "}
            {article.releaseDate}
          </p>
          <p>{article.abstract}</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            View full article
          </a>
        </div>
      );
    });
  }
  console.log("NewsReleases_LD:", NewsReleases_LD);
  return (
    <div className="NewsReleases">
      <h1 className="newsReleases__title">News Releases</h1>
      {newsReleasesArr.length > 0 ? (
        <div className="newsList_container">{newsReleasesArr}</div>
      ) : (
        <p>Currently, there are no news releases.</p>
      )}
    </div>
  );
}

export default NewsReleases;
