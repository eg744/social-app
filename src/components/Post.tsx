import { api, RouterOutputs } from "../utils/api";
import { InfiniteData, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { BsFillHeartFill } from "react-icons/bs";
import Link from "next/link";
import { RouterInputs } from "../utils/api";

import { LikeButton } from "./timelineComponents/LikeButton";

const PFP_IMAGE_WIDTH = 50;
const PFP_IMAGE_HEIGHT = 50;

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  // https://day.js.org/docs/en/customization/relative-time I was getting confused with the 'relativeTime' plugin
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

function updateCache({
  client,
  vars,
  data,
  action,
  input,
}: {
  client: QueryClient;
  vars: {
    postId: string;
  };
  data: {
    userId: string;
  };
  action: "like" | "unlike";
  // Inputs are limit, post by author filters 'where'
  input: RouterInputs["post"]["timeline"];
}) {
  // Pass array with query key and object with vars the query key is called with
  client.setQueryData(
    // New args is the exact query from the queryclient
    // previous args were: [["post", "timeline"], { limit: 10 }],
    [
      ["post", "timeline"],
      {
        input,
        type: "infinite",
      },
    ],
    // Get previous data from callback
    (previousData: any) => {
      const currentData = previousData as InfiniteData<
        RouterOutputs["post"]["timeline"]
      >;

      const likeValue = action === "like" ? 1 : -1;

      const currentPosts = currentData.pages.map((page) => {
        return {
          posts: page.posts.map((post) => {
            if (post.id == vars.postId) {
              return {
                ...post,
                // Update the like record or delete if unliked
                postLikes: action === "like" ? [data.userId] : [],
                _count: {
                  postLikes: post._count.postLikes + likeValue,
                },
              };
            }
            // Post not modified
            return post;
          }),
        };
      });
      return {
        ...currentData,
        pages: currentPosts,
      };
    }
  );
}

export function Post({
  post,
  currentClient,
  input,
}: {
  post: RouterOutputs["post"]["timeline"]["posts"][number];
  currentClient: QueryClient;
  input: RouterInputs["post"]["timeline"];
}) {
  // Update like record
  const likeMutation = api.post.like.useMutation({
    onSuccess: (data, vars) => {
      updateCache({ client: currentClient, vars, data, action: "like", input });
    },
  }).mutateAsync;

  // Delete like record
  const unLikeMutation = api.post.unLike.useMutation({
    onSuccess: (data, vars) => {
      updateCache({
        client: currentClient,
        vars,
        data,
        action: "unlike",
        input,
      });
    },
  }).mutateAsync;
  // Displayed post liked by logged in user
  const isLiked = post.postLikes.length > 0;

  return (
    <div className={" mb-4  border-b-2 border-gray-600"}>
      <div className={" relative flex p-3"}>
        {/* Display when image not null */}
        {post.author.image && (
          <div className={" h-full pl-1"}>
            <Image
              className={" rounded-full"}
              src={post.author.image}
              alt={`${post.author.name}'s profile picture`}
              // style={{ height: "100%", width: "100%" }}

              width={PFP_IMAGE_WIDTH}
              height={PFP_IMAGE_HEIGHT}
            />
          </div>
        )}
        <div className={"ml-4"}>
          <div className={" align-center flex flex-wrap"}>
            <Link href={`/${post.author.name}`}>
              <p className={"mb-1 font-bold"}>{post.author.name}</p>
            </Link>

            {/* DayJS */}
            <p className={" m-0.5 text-sm text-gray-800"}>
              - {dayjs(post.createdAt).fromNow()}
            </p>
            {/* Datetime to ISO string, not react node.  */}
          </div>
          <div className={"pl-1 font-medium"}>{post.text}</div>
        </div>
      </div>
      <div className=" ml-2.5 flex  justify-start p-2">
        <button className={" flex items-center hover:scale-110"}>
          <BsFillHeartFill
            className={" active:animate-ping-active"}
            color={isLiked ? "#8f181e" : "#000"}
            // color="#8f181e"
            size="1.5rem"
            onClick={() => {
              if (isLiked) {
                unLikeMutation({
                  postId: post.id,
                });
                return;
              }
              likeMutation({
                postId: post.id,
              });
            }}
          />
          <span className={" m-1   text-sm text-gray-900"}>
            {/* Display likes: updated in cache */}
            {post._count.postLikes}
          </span>
        </button>
      </div>
    </div>
  );
}
