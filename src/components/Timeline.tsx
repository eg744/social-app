// import Trpc from "../pages/api/trpc/[trpc]";
import { api } from "../utils/api";
import { RouterOutputs } from "../utils/api";
import { CreatePost } from "./CreatePost";

function Post({ post }: { post: RouterOutputs["post"]["timeline"]["posts"] }) {}

export function Timeline() {
  // const {} = Trpc
  const { data } = api.post.timeline.useQuery({
    limit: 2,
  });

  return (
    <div>
      <CreatePost />
      {JSON.stringify(data)}
    </div>
  );
}
