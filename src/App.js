import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import SEARCH_RESPOSITORIES from "./graphql";

const App = () => {
  const QUERY_VARIABLES = {
    first: 10,
    after: null,
    last: null,
    before: null,
    query: "musescore"
  };
  //初期値の登録
  const [searchString, setSearchString] = useState(QUERY_VARIABLES.query);
  //入力値をqueryに反映
  const handleInputChange = e => {
    setSearchString(e.target.value);
    QUERY_VARIABLES.query = e.target.value;
    console.log("handleInputChange called");
  };

  //検索実行
  const handleSubmit = e => {
    console.log("handleSummit called");
    e.preventDefault();
  };
  return (
    <ApolloProvider client={client}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchString} onChange={handleInputChange} />
      </form>
      <Query query={SEARCH_RESPOSITORIES} variables={QUERY_VARIABLES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading....";
          if (error) return `Error! ${error.message}`;
          const search = data.search;
          const repositoryCount = search.repositoryCount;
          const repositoryUnit =
            repositoryCount === 1 ? "Repository" : "Repositories";
          const title = `GitHub Repositories Search Result: ${repositoryCount} ${repositoryUnit}`;
          return (
            <React.Fragment>
              <h1>{title}</h1>
              <ul>
                {search.edges.map(edge => {
                  const node = edge.node;
                  return (
                    <li key={node.id}>
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
