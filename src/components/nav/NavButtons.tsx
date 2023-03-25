import { LoginButton } from "./LoginButton";
import { UserAccountButton } from "./UserAccountButton";

LoginButton;
export function NavButtons() {
  return (
    <section
      className={
        "opacity-1 m-1 mr-2 rounded-md  bg-gray-500 p-2 font-medium shadow-md hover:bg-gray-600"
      }
    >
      <LoginButton />
    </section>
  );
}
