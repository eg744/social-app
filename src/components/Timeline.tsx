import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { Debounce } from "./Debounce";
import { BsFillHeartFill } from "react-icons/bs";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    // * 100 for whole number
    const distanceScrolled = (windowScroll / windowHeight) * 100;

    setScrollPosition(distanceScrolled);
    console.log("scrolled", distanceScrolled);
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
  const currentScrollPosition = useScrollPosition();

  const debouncedScroll = debounce(useScrollPosition, 500);
  debouncedScroll;

  // const debouncedScroll = debounce(currentScrollPosition, 2000);

  //  Use infiniteQuery instead of usequery
  // const { data } = api.post.timeline.useQuery({
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.timeline.useInfiniteQuery(
      {
        // Posts shown per page or per request
        limit: 5,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      }
    );

  console.log("data", data);

  // Available pages of posts: fetches on request when using infinitequery
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    // Percentage of page scrolled, is ok to fetch
    if (currentScrollPosition > 85 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
    // Check scroll position, fetch if needed
  }, [fetchNextPage, currentScrollPosition, hasNextPage, isFetching]);

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  return (
    <div className={" "}>
      {/* Cursor */}
      <CreatePost />
      {/* {JSON.stringify(data)} */}
      <div
        className={
          " rounded-md border-l-2 border-t-2 border-r-2 border-gray-600"
        }
      >
        {/* first iteration: show available posts and request more as needed: {data?.posts.map((post) => { */}
        {/* Reinitialize data when using the infinitequery */}
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}

        {/* Appear at bottom when all pages fetched. */}
        <div className={" flex justify-center"}>
          {!hasNextPage && (
            <p className=" m-2 rounded-sm bg-primaryblue p-2 text-white">
              No more posts to load
            </p>
          )}

          {/* Next page button may be removed with auto load/ infinite scroll */}

          {/* Option to load more posts if they exist */}
          {hasNextPage && (
            <button
              className={
                " m-2 rounded-sm bg-primaryblue p-2 text-white  hover:bg-navyblue"
              }
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetching}
            >
              Load more posts
            </button>
          )}
        </div>
      </div>

      <div>
        {/* Change mutation */}

        <button>
          <BsFillHeartFill
            color="green"
            size="1.5rem"
            onClick={() => console.log("post liked")}
          />
        </button>
      </div>
    </div>
  );
}
