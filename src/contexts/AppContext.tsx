import React, { createContext, useState } from 'react';
import { Search } from '../graphql'

type SearchContextType = {
  searchState: Search;
  // setSearchState: React.Dispatch<React.SetStateAction<Search>>;
  // FIXME: オブジェクト型のstateを変更するためのsetStateの型を調べる
  setSearchState: any;
}

export const SearchContext = createContext({} as SearchContextType)

  // クエリに渡す引数を宣言
  const DEFAULT_VALUE = {
    first: 5,
    after: undefined,
    last: undefined,
    before: undefined,
    query: "",
    type: "REPOSITORY" as "REPOSITORY",
  }

export const AppProvider = (props: { children: React.ReactNode }) => {
  // type SearchContextType = {
  //   searchState: Search;
  //   // setSearchState: React.Dispatch<React.SetStateAction<Search>>;
  //   // FIXME: オブジェクト型のstateを変更するためのsetStateの型を調べる
  //   setSearchState: any;
  // }

  // // クエリに渡す引数を宣言
  // const DEFAULT_VALUE = {
  //   first: 5,
  //   after: undefined,
  //   last: undefined,
  //   before: undefined,
  //   query: "",
  //   type: "REPOSITORY" as "REPOSITORY",
  // }

  const [searchState, setSearchState] = useState(DEFAULT_VALUE)
  // const SearchContext = createContext({} as SearchContextType)

  // https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {props.children}
    </SearchContext.Provider>
  );
};
