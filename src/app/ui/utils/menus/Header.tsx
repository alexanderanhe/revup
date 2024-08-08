import { auth } from "@/auth";

import { Link } from "@/navigation";
import NotificationsButton from "@/app/ui/utils/NotificationsButton";
import PullToRefresh from "@/app/ui/utils/PullToRefresh";

import { User } from "@/lib/definitions";
import ProfileNavImage from "./ProfileNavImage";
import { getTranslations } from "next-intl/server";

export default async function Header({ pullToRefresh, headerButton }: { pullToRefresh?: boolean | string, headerButton: React.ReactNode }) {
  const t = await getTranslations("nav.greetings");
  const session = await auth();
  const user: User | undefined = session?.user;
  const Subtitle = () => <span className="font-medium">{ t("welcome") }</span>

  return (
    <header className="content-grid sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/75">
      { pullToRefresh && <PullToRefresh />}
      <nav className="grid grid-cols-[1fr_auto] px-0 py-4">
        <ProfileNavImage user={user} subtitle={ <Subtitle /> }>
          {!session ? <div className="dropdown dropdown-end">
            <Link href="/login" className="btn btn-primary rounded-2xl">Log In</Link>
          </div> : <NotificationsButton />}
        </ProfileNavImage>
        { headerButton }
      </nav>
    </header>
    
  )
}