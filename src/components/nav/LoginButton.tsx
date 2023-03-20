import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  const loginButtonClassname =
    "opacity-1 m-1 mr-2 rounded-md  bg-gray-500 p-2 font-medium shadow-md hover:bg-gray-600";

  // If user logged in
  if (session) {
    return (
      <button onClick={() => signOut()} className={loginButtonClassname}>
        Log out
      </button>
    );
    // return null;
  }

  return (
    <button onClick={() => signIn()} className={loginButtonClassname}>
      Log in
    </button>
  );
}
