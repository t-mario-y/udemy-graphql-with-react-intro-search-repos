import gql from "graphql-tag";

const ME = gql`
  query me {
    user(login: "t-mario-y") {
      name
      avatarUrl
    }
  }
`;

export default ME;
