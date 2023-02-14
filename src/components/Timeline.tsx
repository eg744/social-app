// import Trpc from "../pages/api/trpc/[trpc]";
import Image from "next/image";
import { api } from "../utils/api";
// import { RouterOutputs } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

// const IMAGE_WIDTH = 48;
// const IMAGE_HEIGHT = 48;

// function Post({
//   post,
// }: {
//   post: RouterOutputs["post"]["timeline"]["posts"][number];
// }) {
//   return (
//     <div>
//       {/* Display when image not null */}
//       {post.author.image && (
//         <Image
//           className={"rounded-full"}
//           src={post.author.image}
//           alt={`${post.author.name}'s profile picture`}
//           width={IMAGE_WIDTH}
//           height={IMAGE_HEIGHT}
//         />
//       )}
//     </div>
//   );
// }

export function Timeline() {
  // const {} = Trpc
  const { data } = api.post.timeline.useQuery({
    limit: 2,
  });

  return (
    <div>
      <CreatePost />
      {JSON.stringify(data)}

      {data?.posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
