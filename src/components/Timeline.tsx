// import Trpc from "../pages/api/trpc/[trpc]";
import { api } from "../utils/api";
import { CreatePost } from "./CreatePost";

export function Timeline() {
  // const {} = Trpc
  const {} = api;

  return (
    <div>
      <CreatePost />
    </div>
  );
}
