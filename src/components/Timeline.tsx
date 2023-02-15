import Image from "next/image";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

export function Timeline() {
  // const {} = Trpc
  const { data } = api.post.timeline.useQuery({
    // Posts shown per page
    limit: 5,
  });

  return (
    <div className={" "}>
      <CreatePost />
      {JSON.stringify(data)}

      <div
        className={
          " rounded-md border-l-2 border-t-2 border-r-2 border-gray-600"
        }
      >
        {data?.posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
