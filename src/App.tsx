import React, { useContext, useState } from 'react';
// import { AppProvider, SearchContext } from './contexts/AppContext';
import { ME, GITHUB_REPOSITORIES } from './graphql'

const App = () => {


  // クエリに渡す引数を宣言
  const DEFAULT_VALUE = {
    first: 5,
    after: undefined,
    last: undefined,
    before: undefined,
    query: "",
    type: "REPOSITORY" as "REPOSITORY",
  }

  const [searchState, setSearchState] = useState(DEFAULT_VALUE)

  // const { searchState, setSearchState } = useContext(SearchContext)
  // console.log({searchState})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, query: event.target.value })
    // if(event) return DEFAULT_VALUE.query = inputValue
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({searchState})
  }

  return (
    <>
      {/* <AppProvider> */}
        <div> hi, GraphQL </div>
        <form onSubmit={handleSubmit}>
          <input value={searchState.query} onChange={handleChange} />
        </form>
        <ME />
        <GITHUB_REPOSITORIES DEFAULT_VALUE={searchState} />
      {/* </AppProvider> */}
    </>
  );
}

export default App;
