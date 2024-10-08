import { auth } from "@/auth";
import { User } from "@/lib/definitions";

export default async function AdminPage() {
  const session = await auth();
  if (!(session?.user as User)?.info?.admin) {
    return null;
  }
  return (
    <></>
  )
}