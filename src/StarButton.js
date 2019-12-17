import React from "react";
import { Mutation } from "react-apollo";
import { ADD_STAR, REMOVE_STAR } from "./graphql";

const StarButton = props => {
  const node = props.node;
  const totalCount = props.node.stargazers.totalCount;
  const isStarred = props.node.viewerHasStarred;
  const starCountString = totalCount === 1 ? "1 star" : `${totalCount}stars`;
  const StarStatus = ({ addOrRemoveStar }) => {
    return (
      <button
        onClick={() => {
          addOrRemoveStar({
            variables: { input: { starrableId: node.id } }
          });
        }}
      >
        {starCountString} | {isStarred ? "⭐️" : "🐶"}
      </button>
    );
  };
  return (
    <Mutation mutation={!isStarred ? ADD_STAR : REMOVE_STAR}>
      {addOrRemoveStar => <StarStatus addOrRemoveStar={addOrRemoveStar} />}
    </Mutation>
  );
};

export default StarButton;
