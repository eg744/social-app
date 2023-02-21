import Image from "next/image";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { LoadPostsButton } from "./timelineComponents/LoadPostsButton";

export function Timeline() {
  //  Use infiniteQuery instead of usequery
  // const { data } = api.post.timeline.useQuery({
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.timeline.useInfiniteQuery(
      {
        // Posts shown per page
        limit: 5,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      }
    );

  console.log("data", data);

  // Available pages of posts: fetches on request when using infinitequery
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className={" "}>
      {/* Cursor */}
      {/* next cursor: {data?.nextCursor} */}
      <CreatePost />
      {/* {JSON.stringify(data)} */}
      <div
        className={
          " rounded-md border-l-2 border-t-2 border-r-2 border-gray-600"
        }
      >
        {/* {data?.posts.map((post) => { */}
        {/* Reinitialize data when using the infinitequery */}
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
        {/* Option to load more posts if they exist */}
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          Load more posts
        </button>
      </div>
    </div>
  );
}
