import { BsFillHeartFill } from "react-icons/bs";

export function LikeButton() {
  return (
    <button className={" hover:scale-110"}>
      <BsFillHeartFill
        color="#8f181e"
        size="1.5rem"
        onClick={() => console.log("post liked")}
      />
    </button>
  );
}
