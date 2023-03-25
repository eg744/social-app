import { useSession } from "next-auth/react";

const { data: session } = useSession();

export default function UserPage() {}
