/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
// import gql from 'graphql-tag';
// import { useQuery } from 'react-apollo-hooks';
import useFetch from 'fetch-suspense';

export default function App() {
  const launchesPast = useFetch('https://api.spacex.land/rest/launches-past');
  // const {
  //   data: { launchesPastGraphQL }
  // } = useQuery(query);
  console.log('launchesPast: ', launchesPast);

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

// const query = gql`
//   query getLaunches {
//     launchesPast {
//       mission_name
//       details
//       links {
//         flickr_images
//       }
//     }
//   }
// `;
