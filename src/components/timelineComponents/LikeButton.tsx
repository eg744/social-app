import { BsFillHeartFill } from "react-icons/bs";
import { api } from "../../utils/api";
import { Post } from "../Post";

export function LikeButton({ ...post }) {
  const likeMutation = api.post.like.useMutation().mutateAsync;
  const unlikeMutation = api.post.unLike.useMutation().mutateAsync;

  return (
    <button className={" flex  items-center hover:scale-110"}>
      <BsFillHeartFill
        color="#8f181e"
        size="1.5rem"
        onClick={() => {
          console.log("post liked", post.id);
          likeMutation({
            postId: post.id,
          });
        }}
      />
      <span className={" m-1   text-sm text-gray-900"}>{10}</span>
    </button>
  );
}
