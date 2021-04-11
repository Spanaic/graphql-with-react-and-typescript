import React, { useContext } from 'react';
import { SearchContext } from './contexts/AppContext';
import { ME, GITHUB_REPOSITORIES } from './graphql'

const App = () => {

  const { searchState, setSearchState } = useContext(SearchContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, query: event.target.value })
    console.log({searchState})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({searchState})
  }

  return (
    <>
      <div> hi, GraphQL </div>
      <form onSubmit={handleSubmit}>
        <input value={searchState.query} onChange={handleChange} />
      </form>
      <ME />
      <GITHUB_REPOSITORIES />
    </>
  );
}

export default App;
