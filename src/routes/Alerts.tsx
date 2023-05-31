import * as React from "react";
import "./Alerts.css";
import { Params, useLoaderData } from "react-router-dom";

type alertsData = {
  alerts: {
    category: string;
    description: string;
    id: string;
    lastIndexedDate: string;
    title: string;
    url: string;
  }[];
};

export async function loadAlerts({
  params,
}: {
  params: Params;
}): Promise<alertsData | null> {
  const alertsResponse = await fetch(
    `https://developer.nps.gov/api/v1/alerts?parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const alertsData = await alertsResponse.json();
  return { alerts: alertsData.data };
}

function Alerts() {
  const Alerts_LD = useLoaderData() as alertsData;
  console.log("Alerts_LD:", Alerts_LD);
  let alertsArr: React.ReactElement[] = Alerts_LD.alerts.map((alert) => {
    return (
      <div className="alert_container" key={alert.id}>
        <h2>{alert.title}</h2>
        <p>{alert.lastIndexedDate}</p>
        <p>
          <span className="span_bold_1_AL">Category: </span>
          {alert.category}
        </p>
        <p>
          <span className="span_bold_1_AL">Description: </span>
          {alert.description}
        </p>
        <a href={alert.url} target="_blank" rel="noreferrer">
          More Information
        </a>
      </div>
    );
  });
  return (
    <div className="Alerts">
      <h1 className="alerts__title">Alerts</h1>
      {Alerts_LD.alerts.length > 0 ? (
        <div className="alerts_list_container">{alertsArr}</div>
      ) : (
        <p>There are currently no alerts for this park.</p>
      )}
    </div>
  );
}

export default Alerts;
