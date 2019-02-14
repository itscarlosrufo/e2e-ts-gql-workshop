import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import { ApolloProvider } from 'react-apollo-hooks';
// import ApolloClient from 'apollo-boost';
const App = React.lazy(() => import('./app/App'));

// const client = new ApolloClient({
//   uri: 'https://api.spacex.land/graphql'
// });

ReactDOM.render(
  // <ApolloProvider client={client}>
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  // </ApolloProvider>,
  document.getElementById('root')
);
