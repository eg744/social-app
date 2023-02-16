import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  // If user logged in
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className={
          "  opacity-1 m-1 mr-2 rounded-md  bg-gray-500 p-2 font-medium shadow-md hover:bg-gray-600"
        }
      >
        Log out
      </button>
    );
    // return null;
  }

  return (
    <button
      onClick={() => signIn()}
      className={
        "  opacity-1 m-1 mr-2 rounded-md  bg-gray-500 p-2 font-medium shadow-md hover:bg-gray-600"
      }
    >
      Log in
    </button>
  );
}
