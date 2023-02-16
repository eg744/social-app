import { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

// let relativeTime = require("dayjs/plugin/relativeTime");

// dayjs().format();

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.extend(relativeTime);

// dayjs().from(dayjs("1990-01-01")); // in 31 years
// dayjs().from(dayjs("1990-01-01"), true); // 31 years
// dayjs().fromNow();

// dayjs().to(dayjs("1990-01-01")); // "31 years ago"
// dayjs().toNow();
dayjs.updateLocale("en", {});

const PFP_IMAGE_WIDTH = 48;
const PFP_IMAGE_HEIGHT = 48;

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
            <p className={"font-bold"}>{post.author.name}</p>

            {/* DayJS */}
            <p className={" text-sm  text-gray-800"}>
              - {dayjs(post.createdAt).fromNow()}
            </p>
            {/* Datetime to ISO string, not react node.  */}
            {/* <p className={"text-sm  text-gray-800"}>
              - {new Date(post.createdAt).toISOString()}
            </p> */}
          </div>
          <div className={" font-medium"}>{post.text}</div>
        </div>
      </div>
    </div>
  );
}
