import { auth } from "@/auth";
import Notification from "@/app/ui/admin/Notification";
import NotionButtonSync from "@/app/ui/admin/NotionButtonSync";
import UploadImages from "@/app/ui/admin/UploadImages";
import { getUsersWithSubscription } from "@/lib/data";
import ListImages from "@/app/ui/admin/ListImages";
import { User } from "@/lib/definitions";

export default async function AdminPage() {
  const session = await auth();
  if (!(session?.user as User)?.info?.admin) {
    return null;
  }
  const users = await getUsersWithSubscription();
  return (
    <>
      <Notification users={users} />
      <NotionButtonSync />
      <UploadImages />
      <ListImages />
    </>
  )
}