import React from 'react';
import { ME, GITHUB_REPOSITORIES } from './graphql'

const App = () => {

  return (
    <>
      <div> hi, GraphQL </div>
      <ME />
      <GITHUB_REPOSITORIES />
    </>
  );
}

export default App;
