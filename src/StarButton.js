import React from "react";

const StarButton = props => {
  const totalCount = props.node.stargazers.totalCount;
  const isStarred = props.node.viewerHasStarred;
  return (
    <button>
      {totalCount === 1 ? "1 star" : `${totalCount}stars`}{" "}
      {isStarred ? "⭐️" : "🐶"}
    </button>
  );
};

export default StarButton;
