import React from 'react';
import { Suspense } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import App from './app/App';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </ApolloProvider>,
  document.getElementById('root')
);
