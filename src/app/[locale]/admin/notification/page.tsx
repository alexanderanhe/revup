import { auth } from "@/auth";
import Notification from "@/app/ui/admin/Notification";
import { getUsersWithSubscription } from "@/lib/data";
import { User } from "@/lib/definitions";

export default async function AdminNotificationPage() {
  const session = await auth();
  if (!(session?.user as User)?.info?.admin) {
    return null;
  }
  const users = await getUsersWithSubscription();
  return (
    <Notification users={users} />
  )
}