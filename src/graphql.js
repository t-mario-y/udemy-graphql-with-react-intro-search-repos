import gql from "graphql-tag";

const SEARCH_RESPOSITORIES = gql`
  query searchRepositoriesWithPagination(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $query: String!
  ) {
    search(
      first: $first
      after: $after
      last: $last
      before: $before
      query: $query
      type: REPOSITORY
    ) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            nameWithOwner
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
`;

export default SEARCH_RESPOSITORIES;

// export const ME = gql`
//   query me {
//     user(login: "t-mario-y") {
//       name
//       avatarUrl
//     }
//   }
// `;
