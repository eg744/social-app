import React from "react";
import { Timeline } from "../components/Timeline";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();

  const name = router.query.username as string;
  console.log("query", router);

  return (
    <div>
      <Timeline
        where={{
          author: {
            name,
          },
        }}
      />
    </div>
  );
}
