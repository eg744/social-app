import { RouterOutputs } from "../utils/api";
import Image from "next/image";

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

        <div className={" p-1"}>
          <p>{post.author.name}</p>
          {/* Datetime to ISO string, not react node.  */}
          <p>{new Date(post.createdAt).toISOString()}</p>
        </div>
      </div>
    </div>
  );
}
