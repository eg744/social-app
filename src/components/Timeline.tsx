import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { LoadPostsButton } from "./timelineComponents/LoadPostsButton";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    // *100 for whole number
    const distanceScrolled = (windowScroll / windowHeight) * 100;

    setScrollPosition(distanceScrolled);
  }

  useEffect(() => {
    // Passive means listener won't call preventDefault(). Aids infinite scroll functionality
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

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
        <div className={" flex justify-center"}>
          <button
            className={
              " m-2 rounded-sm bg-primaryblue p-2 text-white  hover:bg-navyblue"
            }
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
          >
            Load more posts
          </button>
        </div>
      </div>
    </div>
  );
}
