import React from 'react';
import routes from './Routes';
import { useRoutes } from 'react-router-dom';

function App() {
  const routing = useRoutes(routes);

  return <>{routing}</>;
}

export default App;
