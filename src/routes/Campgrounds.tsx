import * as React from "react";
import "./Campgrounds.css";
import { Params, useLoaderData } from "react-router-dom";

type campgroundsData = {
  campgrounds: {
    accessibility: {
      accessRoads: string[];
      adaInfo: string;
      additionalInfo: string;
      cellPhoneInfo: string;
      classifications: string[];
      fireStovePolicy: string;
      internetInfo: string;
      rvAllowed: string;
      rvInfo: string;
      rvMaxLength: string;
      trailerAllowed: string;
      trailerMaxLength: string;
      wheelchairAccess: string;
    };
    addresses: {
      city: string;
      countryCode: "string";
      line1: string;
      line2: string;
      line3: string;
      postalCode: string;
      stateCode: string;
    }[];
    amenities: {
      amphitheater: string;
      campStore: string;
      cellPhoneReception: string;
      dumpStation: string;
      firewoodForSale: string;
      foodStorageLockers: string;
      iceAvailableForSale: string;
      internetConnectivity: string;
      laundry: string;
      potableWater: string[];
      showers: string[];
      staffOrVolunteerHostOnsite: string;
      toilets: string[];
      trashRecyclingCollection: string;
    };
    campsites: {
      electricalHookups: string;
      group: string;
      horse: string;
      other: string;
      rvOnly: string;
      tentOnly: string;
      totalSites: string;
      walkToBoat: string;
    };
    contacts: {
      phoneNumbers: {
        phoneNumber: string;
      }[];
    };
    description: string;
    directionsOverview: string;
    fees: {
      cost: string;
      description: string;
      title: string;
    }[];
    id: string;
    images: {
      title: string;
      altText: string;
      url: string;
    }[];
    name: string;
    numberOfSitesFirstComeFirstServe: string;
    numberOfSitesReservable: string;
    operatingHours: {
      description: string;
      exceptions: string[];
      standardHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
      };
    }[];
  }[];
};

export async function loadCampgrounds({
  params,
}: {
  params: Params;
}): Promise<campgroundsData | null> {
  const campgroundsResponse = await fetch(
    `https://developer.nps.gov/api/v1/campgrounds?limit=1000&parkCode=${params.park}&api_key=9JlgO9YSfRlkWXenMR8S3X3uW9uW0cZBdycA46tm`
  );
  const campgroundsData = await campgroundsResponse.json();
  console.log(params.park);
  return { campgrounds: campgroundsData.data };
}

function Campgrounds() {
  const Campgrounds_LD = useLoaderData() as campgroundsData;
  console.log("Campgrounds_LD:", Campgrounds_LD.campgrounds);
  return (
    <div className="Campgrounds">
      <h1 className="campgrounds__title">Campgrounds</h1>
      {Campgrounds_LD.campgrounds.length === 0 ? (
        <p>There are currently no campgrounds for this park.</p>
      ) : (
        <p>There are campgrounds!</p>
      )}
    </div>
  );
}

export default Campgrounds;
