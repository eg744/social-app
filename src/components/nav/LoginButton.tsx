import { signIn, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  //   If user logged in (commented for dev for now)
  //   if (session) {
  //     return null;
  //   }

  return (
    <button
      onClick={() => signIn()}
      className={"  m-1 mr-2 rounded-md bg-gray-500  p-2 font-medium"}
    >
      Log in
    </button>
  );
}
