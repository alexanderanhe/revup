import Notification from "@/app/ui/admin/Notification";
import { getUsersWithSubscription } from "@/lib/data";

export default async function AdminPage() {
  const users = await getUsersWithSubscription();
  return (
    <>
      <Notification users={users} />
    </>
  )
}