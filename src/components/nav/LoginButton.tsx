import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn()}
      className={" m-1 rounded-md bg-gray-500 p-2 "}
    >
      Log in
    </button>
  );
}
