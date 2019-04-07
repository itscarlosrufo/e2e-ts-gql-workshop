import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import useFetch from "fetch-suspense";

export default function App() {
  const launchesPastRest = useFetch(
    "https://api.spacex.land/rest/launches-past"
  );
  const {
    data: { launchesPast }
  } = useQuery(query);

  return (
    <React.Fragment>
      {launchesPast.map(({ mission_name, details, links, rocket }) => (
        <div key={String(mission_name)}>
          <h3>
            🛰 {mission_name} 🚀 {rocket.name}
          </h3>
          <p>{details}</p>
          <img src={links.flickr_images[0]} width="200" />
        </div>
      ))}
    </React.Fragment>
  );
}

const query = gql`
  query getLaunches {
    launchesPast {
      mission_name
      details
      links {
        flickr_images
      }
      rocket {
        name: rocket_name
      }
    }
  }
`;
