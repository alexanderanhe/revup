import Notification from "@/app/ui/admin/Notification";
import { getUsersWithSubscription } from "@/lib/data";
import { auth, currentUser, User } from "@clerk/nextjs/server";

export default async function AdminNotificationPage() {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  const user = await currentUser() as User;
  const isAdmin = authenticated && (user?.publicMetadata?.roles as string[])?.includes('admin');
  if (!isAdmin) { // is not admin
    return null;
  }
  const users = await getUsersWithSubscription();
  return (
    <Notification users={users} />
  )
}