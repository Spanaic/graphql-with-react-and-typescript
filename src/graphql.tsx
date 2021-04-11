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

export const ME = () => {
  const { loading, error, data } = useQuery<UserData, Login>(GET_USER, { variables: { login: "Spanaic" } });
  return (
    <>
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
  )
}

// searchクエリの引数の型
export type Search = {
  first: number
  after?: string,
  last?: number,
  before?: string,
  query: string,
  type: "REPOSITORY"
}

// 戻り値の型
type RepositoryData = {
  repositoryCount: number;
  pageInfo: PageInfo;
  edges: RepositoryEdges;
}

// 戻り値内の型
type PageInfo = {
  endCurosor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

// 戻り値内の型
type RepositoryEdges = {
  cursor: string;
  node: {
    Repository: {
      id: string;
      name:string;
      url: string;
      stargazers: {
        totalCount: number;
      }
      viewerHasStarred: boolean;
    }
  }
}

type DefaultValueProps = {
  DEFAULT_VALUE: Search;
}

// // クエリに渡す引数を宣言
// const VARIABLES = {
//   first: 5,
//   after: undefined,
//   last: undefined,
//   before: undefined,
//   query: "フロントエンドエンジニア",
//   type: "REPOSITORY" as "REPOSITORY",
// }

// GraphQLのクエリ
const SEARCH_REPOSITORY = gql`
  query searchRepositories($first: Int, $after: String, $last: Int, $before: String, $query: String!) {
    search(first: $first, after: $after, last: $last, before: $before, query: $query, type: REPOSITORY) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`
// クエリを呼び出す関数コンポーネント
export const GITHUB_REPOSITORIES = (DEFAULT_VALUE: DefaultValueProps) => {
  console.log(DEFAULT_VALUE)
  const { data } = useQuery<RepositoryData, Search>(SEARCH_REPOSITORY, { variables: { first: DEFAULT_VALUE.DEFAULT_VALUE.first, after: DEFAULT_VALUE.DEFAULT_VALUE.after, last: DEFAULT_VALUE.DEFAULT_VALUE.last, before: DEFAULT_VALUE.DEFAULT_VALUE.before, query: DEFAULT_VALUE.DEFAULT_VALUE.query, type: DEFAULT_VALUE.DEFAULT_VALUE.type } })
  // const { data } = useQuery<RepositoryData, Search>(SEARCH_REPOSITORY, { variables: { first: VARIABLES.first, after: VARIABLES.after, last: VARIABLES.last, before: VARIABLES.before, query: VARIABLES.query, type: VARIABLES.type } })
  console.log({ data })

  return (
    <>
    </>
  )
}
