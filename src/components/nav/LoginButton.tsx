import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  // If user logged in
  if (session) {
    return <button onClick={() => signOut()}>Log out</button>;
    // return null;
  }

  return <button onClick={() => signIn()}>Log in</button>;
}
