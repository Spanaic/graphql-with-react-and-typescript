import React from 'react';
import { gql, useQuery } from '@apollo/client'

type UserData = {
  user: {
    name: string;
    avatarUrl: string;
  }
}

type Login = {
  login: string;
}

const GET_USER = gql`
  query me {
    user(login: "Spanaic") {
      name,
      avatarUrl,
    }
  }
`

function App() {
  const { loading, error, data } = useQuery<UserData, Login>(GET_USER, { variables: { login: "Spanaic" } });
  console.log({data})
  return (
    <>
      <div> hi, GraphQL </div>
      {/* NOTE: tsxの中で条件分岐を行う方法 */}
        {/* 条件が複雑になってきたらコンポーネントの分割を行う */}
      {/* https://qiita.com/SLEAZOIDS/items/4f3c1b77d291eef548af */}
      {/* { loading ? ( <p>Loading...</p> ) : ( <p>{data?.user.avatarUrl}</p> ) } */}

      {/* https://ja.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator */}
      { loading && ( <p>Loading...</p> ) }
      { data && ( <p>{data?.user.avatarUrl}</p> ) }
      { error && ( <p>{error.message}</p> ) }
      {/* 複数条件をまとめて書く方法は...? */}
    </>
  );
}

export default App;
