import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  // User logged in: session !null
  if (session) {
    return <button onClick={() => signOut()}>Log out</button>;
  }

  return <button onClick={() => signIn()}>Log in</button>;
}
