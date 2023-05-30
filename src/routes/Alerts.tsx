import * as React from "react";
import "./Alerts.css";
import { Params, useLoaderData } from "react-router-dom";

type alertsData = {};

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
  return (
    <div className="Alerts">
      <h1 className="alerts__title">Alerts</h1>
    </div>
  );
}

export default Alerts;
