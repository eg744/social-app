import { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

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

export function Post({
  post,
}: {
  post: RouterOutputs["post"]["timeline"]["posts"][number];
}) {
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
    </div>
  );
}
