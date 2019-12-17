import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import { SEARCH_RESPOSITORIES } from "./graphql";
import StarButton from "./StarButton";

const App = () => {
  const PER_PAGE_COUNT = 10;
  const QUERY_VARIABLES = {
    first: PER_PAGE_COUNT,
    after: null,
    last: null,
    before: null,
    query: "musescore"
  };
  const [searchCondition, setSearchCondition] = useState(QUERY_VARIABLES);

  //初期値の登録
  const [searchString, setSearchString] = useState(searchCondition.query);
  //入力値をqueryに反映
  const handleInputChange = e => {
    setSearchString(e.target.value);
    searchCondition.query = e.target.value;
    console.log(searchCondition);
  };

  //検索実行
  //TODO: このままでは動かない
  //useCallBack 使えそう
  const handleSubmit = e => {
    console.log("handleSummit called");
    e.preventDefault();
  };
  const goNext = search => {
    searchCondition.first = PER_PAGE_COUNT;
    searchCondition.after = search.pageInfo.endCursor;
    searchCondition.last = null;
    searchCondition.before = null;
  };
  const backPrevious = search => {
    searchCondition.first = null;
    searchCondition.after = null;
    searchCondition.last = PER_PAGE_COUNT;
    searchCondition.before = search.pageInfo.endCursor;
  };
  //このままでは動かない:ここまで
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
                      <StarButton node={node} />
                    </li>
                  );
                })}
              </ul>
              {search.pageInfo.hasPreviousPage ? (
                <button onClick={backPrevious(search)}>Previous</button>
              ) : null}
              {search.pageInfo.hasNextPage ? (
                <button onClick={goNext(search)}>Next</button>
              ) : null}
            </React.Fragment>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
