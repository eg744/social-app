import Image from "next/image";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

export function Timeline() {
  //  Use infiniteQuery instead of usequery
  // const { data } = api.post.timeline.useQuery({
  const { data, hasNextPage, fetchNextPage, isFetched } =
    api.post.timeline.useInfiniteQuery(
      {
        // Posts shown per page
        limit: 5,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      }
    );

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
        {/* Reinitialzie data when using the infinitequery */}
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
