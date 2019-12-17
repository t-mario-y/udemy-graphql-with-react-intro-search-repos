import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
//import { useQuery } from "@apollo/react-hooks";
import client from "./client";
import SEARCH_RESPOSITORIES from "./graphql";

const QUERY_VARIABLES = {
  first: 10,
  after: null,
  last: null,
  before: null,
  query: "musescore"
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Query query={SEARCH_RESPOSITORIES} variables={QUERY_VARIABLES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading....";
          if (error) return `Error! ${error.message}`;
          return (
            <React.Fragment>
              <ul>
                {data.search.edges.map(edge => {
                  const node = edge.node;
                  return (
                    <li>
                      <a href={node.url} target="#">
                        {node.nameWithOwner}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
