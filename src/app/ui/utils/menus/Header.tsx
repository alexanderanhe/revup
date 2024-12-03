import { Link } from "@/navigation";
import NotificationsButton from "@/app/ui/utils/NotificationsButton";
import PullToRefresh from "@/app/ui/utils/PullToRefresh";

import ProfileNavImage from "./ProfileNavImage";
import { getTranslations } from "next-intl/server";
import { auth, currentUser, User } from "@clerk/nextjs/server";

export default async function Header({ pullToRefresh, headerButton }: { pullToRefresh?: boolean | string, headerButton: React.ReactNode }) {
  const t = await getTranslations("nav.greetings");
  const { userId, sessionClaims } = await auth();
  if (userId === null || sessionClaims === null) {
    return null;
  }
  const user = await currentUser() as User;
  const Subtitle = () => <span className="font-medium">{ t("welcome") }</span>

  return (
    <header className="content-grid sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/75">
      { pullToRefresh && <PullToRefresh />}
      <nav className="grid grid-cols-[1fr_auto] px-0 py-4">
        <ProfileNavImage user={user} subtitle={ <Subtitle /> }>
          <NotificationsButton />
        </ProfileNavImage>
        { headerButton }
      </nav>
    </header>
    
  )
}