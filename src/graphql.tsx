import { gql, useQuery } from '@apollo/client'
import { getNodeText } from '@testing-library/dom'
import { useContext } from 'react'
import { createArrowFunction, isArrowFunction } from 'typescript'
import { SearchContext } from './contexts/AppContext'

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
  first: number;
  after?: string;
  last?: number;
  before?: string;
  query: string;
  type: "REPOSITORY";
}
// export type Search = {
//   first: number
//   after?: string,
//   last?: number,
//   before?: string,
//   query: string,
//   type: "REPOSITORY"
// }

// 戻り値の型
type RepositoryData = {
  search: {
    repositoryCount: number;
    pageInfo: PageInfo;
    edges: RepositoryEdges[];
  } | undefined;
}
// type RepositoryData = {
//   search: {
//     repositoryCount: number;
//     pageInfo: PageInfo;
//     edges: RepositoryEdges[];
//   }
// }

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
    id: string;
    name:string;
    url: string;
    stargazers: {
      totalCount: number;
    }
    viewerHasStarred: boolean;
  }
}

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
export const GITHUB_REPOSITORIES = () => {
  const { searchState, setSearchState } = useContext(SearchContext)
  const { data, error, loading, fetchMore } = useQuery<RepositoryData, Search>(SEARCH_REPOSITORY, { variables: { first: searchState.first, after: searchState.after, last: searchState.last, before: searchState.before, query: searchState.query, type: searchState.type } })
  // console.log({ data })

  // タイトル
  const search = data?.search
  const repositoryCount = search?.repositoryCount
  const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
  const title = `GitHub Repositories Search Results - ${repositoryCount} ${repositoryUnit}`

  // 次のページに遷移する処理
  // https://caddi.tech/archives/2195#i-5
  // FIXME: onClickが押された時にデフォルト値に戻ってしまっている気がする
  const PER_PAGE = 5
  const goNext = (data: any) => {
    console.log('fetch', data)
      setSearchState({
        first: PER_PAGE,
        after: data.search.pageInfo.endCurosor,
        last: null,
        before: null,
      })
      console.log({searchState})
    // }
  }

  if (error) return <div>errors</div>
  if (loading || !data) return <div>loading</div>

  return (
    <>
      <h2>{title}</h2>
      <ul>
        {
          search?.edges.map(edge => {
            return (
              <li key={edge.node.id}>
                <a href={edge.node.url} target="_blank" rel="noreferrer" >{edge.node.name}</a>
              </li>
            )
          })
        }
      </ul>
      {
        search?.pageInfo.hasNextPage === true ?
          <button
            onClick={async (e) => {
              e.preventDefault()
              const fetchMoreResult = await fetchMore({
                variables: { after: data.search?.pageInfo.endCurosor },
              })
              console.log(fetchMoreResult)
              goNext(fetchMoreResult.data)
            }
          }>
            Next
          </button>
          :
          null
      }
    </>
  )
}
