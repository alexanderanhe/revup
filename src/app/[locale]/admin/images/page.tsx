import { auth } from "@/auth";
import UploadImages from "@/app/ui/admin/UploadImages";
import ListImages from "@/app/ui/admin/ListImages";
import { User } from "@/lib/definitions";

export default async function AdminPage() {
  const session = await auth();
  if (!(session?.user as User)?.info?.admin) {
    return null;
  }
  return (
    <>
      <UploadImages />
      <ListImages />
    </>
  )
}