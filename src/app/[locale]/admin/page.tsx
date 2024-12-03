import { auth, currentUser, User } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  const user = await currentUser() as User;
  const isAdmin = authenticated && (user?.publicMetadata?.roles as string[])?.includes('admin');
  if (!isAdmin) { // is not admin
    return null;
  }
  return (
    <></>
  )
}