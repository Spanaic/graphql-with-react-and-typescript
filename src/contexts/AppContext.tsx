import React, { createContext, useState } from 'react';
import { Search } from '../graphql'

// Contextの型を定義
type SearchContextType = {
  searchState: Search;
  // setSearchState: React.Dispatch<React.SetStateAction<Search>>; => エラー発生
  // FIXME: オブジェクト型のstateを変更するためのsetStateの型を調べる
  setSearchState: any;
}
// 定義した型のContextを生成
export const SearchContext = createContext({} as SearchContextType)

  // クエリに渡す引数を宣言
    // hooksに渡すデフォルト値を設定
  const DEFAULT_VALUE = {
    first: 5,
    after: undefined,
    last: undefined,
    before: undefined,
    query: "aaa",
    type: "REPOSITORY" as "REPOSITORY",
  }

export const AppProvider = (props: { children: React.ReactNode }) => {
  // hooksの呼び出しはContextファイルに移動
  const [searchState, setSearchState] = useState(DEFAULT_VALUE)

  // https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
  return (
    // hooksのstateやセッターをpropsとしてラップしたコンポーネント配下に送る
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {props.children}
    </SearchContext.Provider>
  );
};
