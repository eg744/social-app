import { RouterOutputs } from "../utils/api";
import Image from "next/image";

const IMAGE_WIDTH = 48;
const IMAGE_HEIGHT = 48;

export function Post({
  post,
}: {
  post: RouterOutputs["post"]["timeline"]["posts"][number];
}) {
  return (
    <div>
      {/* Display when image not null */}
      {post.author.image && (
        <Image
          className={"rounded-full"}
          src={post.author.image}
          alt={`${post.author.name}'s profile picture`}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
      )}
    </div>
  );
}
