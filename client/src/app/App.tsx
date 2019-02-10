import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { GetLaunches } from '../types/types';

export default function App() {
  const {
    data: { launchesPast }
  } = useQuery<GetLaunches.Query>(query);

  return (
    <React.Fragment>
      {launchesPast.map(({ mission_name, details, links }) => (
        <div key={String(mission_name)}>
          <h3>🛰 {mission_name}</h3>
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
    }
  }
`;
