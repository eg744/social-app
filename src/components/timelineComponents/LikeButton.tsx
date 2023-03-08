import { QueryClient } from "@tanstack/react-query";
import { log } from "console";
import { BsFillHeartFill } from "react-icons/bs";
import { api } from "../../utils/api";
import { Post } from "../Post";

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
    userid: string;
  };
  action: "like" | "unlike";
}) {}

export function LikeButton({ ...post }) {
  const likeMutation = api.post.like.useMutation().mutateAsync;
  // Delete record
  const unLikeMutation = api.post.unLike.useMutation().mutateAsync;

  // Displayed post liked by logged in user
  const isLiked = post.postLikes.length > 0;

  return (
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
  );
}
