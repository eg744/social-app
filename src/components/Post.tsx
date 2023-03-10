import { api, RouterOutputs } from "../utils/api";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { BsFillHeartFill } from "react-icons/bs";

import { LikeButton } from "./timelineComponents/LikeButton";

const PFP_IMAGE_WIDTH = 48;
const PFP_IMAGE_HEIGHT = 48;

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
}: {
  client: QueryClient;
  vars: {
    postId: string;
  };
  data: {
    userId: string;
  };
  action: "like" | "unlike";
}) {
  // Pass array with query key and object with vars the query key is called with
  client.setQueryData(
    // Previous args. new args are exact query from the queryclient devtools
    // [["post", "timeline"], { limit: 10 }],
    [
      ["post", "timeline"],
      {
        input: {
          limit: 5,
        },
        type: "infinite",
      },
    ],
    // Get previous data from callback
    (previousData: any) => {
      console.log("previous data", { previousData });
    }
  );
}

export function Post({
  post,
  currentClient,
}: {
  post: RouterOutputs["post"]["timeline"]["posts"][number];
  currentClient: QueryClient;
}) {
  // Update like record
  const likeMutation = api.post.like.useMutation({
    onSuccess: (data, vars) => {
      updateCache({ client: currentClient, vars, data, action: "like" });
    },
  }).mutateAsync;

  // Delete like record
  const unLikeMutation = api.post.unLike.useMutation({
    onSuccess: (data, vars) => {
      updateCache({ client: currentClient, vars, data, action: "unlike" });
    },
  }).mutateAsync;
  // Displayed post liked by logged in user
  const isLiked = post.postLikes.length > 0;

  return (
    <div className={"mb-4  border-b-2 border-gray-600"}>
      <div className={"flex p-2"}>
        {/* Display when image not null */}
        {post.author.image && (
          <Image
            className={"rounded-full"}
            src={post.author.image}
            alt={`${post.author.name}'s profile picture`}
            width={PFP_IMAGE_WIDTH}
            height={PFP_IMAGE_HEIGHT}
          />
        )}
        <div className={"ml-4"}>
          <div className={" align-center flex flex-wrap"}>
            <p className={"mb-1 font-bold"}>{post.author.name}</p>

            {/* DayJS */}
            <p className={" text-sm  text-gray-800"}>
              - {dayjs(post.createdAt).fromNow()}
            </p>
            {/* Datetime to ISO string, not react node.  */}
            {/* <p className={"text-sm  text-gray-800"}>
              - {new Date(post.createdAt).toISOString()}
            </p> */}
          </div>
          <div className={"pl-1 font-medium"}>{post.text}</div>
        </div>
      </div>
      <div className=" ml-2.5 flex  justify-start p-2">
        <button className={" flex  items-center hover:scale-110"}>
          <BsFillHeartFill
            color={isLiked ? "#8f181e" : "#000"}
            // color="#8f181e"
            size="1.5rem"
            onClick={() => {
              console.log("post liked", post.id);

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
          <span className={" m-1   text-sm text-gray-900"}>{10}</span>
        </button>
        {/* <LikeButton {...{ currentClient, ...post }} /> */}
      </div>
    </div>
  );
}
