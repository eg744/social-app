import { BsFillHeartFill } from "react-icons/bs";

export function LikeButton() {
  return (
    <button className={" flex  items-center hover:scale-110"}>
      <BsFillHeartFill
        color="#8f181e"
        size="1.5rem"
        onClick={() => console.log("post liked")}
      />
      <span className={" m-1   text-sm text-gray-900"}>{10}</span>
    </button>
  );
}
