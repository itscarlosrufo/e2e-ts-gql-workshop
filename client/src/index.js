import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
const App = React.lazy(() => import('./app/App'));

ReactDOM.render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById('root')
);
