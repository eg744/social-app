import { useSession } from "next-auth/react";

export function UserAccountButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button>
        <img
          className={"rounded-full"}
          width={"50"}
          height={"50"}
          src={`${session?.user?.image}`}
        ></img>
        <p className={" text-sm"}>{"Profile"}</p>
      </button>
    );
  }

  return <></>;
}
