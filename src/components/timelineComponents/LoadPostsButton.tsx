import React from "react";

export function LoadPostsButton(hasNextPage, isFetching) {
  if (hasNextPage || isFetching) {
    return (
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        Load more posts
      </button>
    );
  }
}
