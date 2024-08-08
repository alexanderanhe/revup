import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import { ArrowRightIcon, ChartBarSquareIcon, ChartPieIcon, Cog6ToothIcon, EnvelopeIcon, StarIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"

import Card from "@/app/ui/Card"
import { Link } from "@/navigation"
import { auth } from "@/auth"
import ProfileImage from "@/app/ui/utils/ProfileImage"
import { User } from "@/lib/definitions"
import { getTranslations } from "next-intl/server"
import { PencilIcon } from "@heroicons/react/24/solid"
import Logout from "@/app/ui/profile/Logout"
import { PAGES } from "@/lib/routes"
import PopUpNotification from "@/app/ui/profile/PopUpNotification"
import ProfileNavImage from "@/app/ui/utils/menus/ProfileNavImage"

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as User;
  const t = await getTranslations("Profile");
  const tAssessmentOpts = await getTranslations("Assessment.options");

  return (
    <LayoutContent title={t("title")} footer>
      <ProfileNavImage user={user} subtitle={ tAssessmentOpts(`goal:${user?.info?.goal}`) }>
        <Link href="/profile/edit" className="btn btn-sm btn-primary">
          <PencilIcon className="size-4" />
          Edit
        </Link>
      </ProfileNavImage>
      <section className="grid grid-cols-3">
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>{ user?.info?.height }{ " " }{ t("height:unit") }</strong>
          { t("height") }
        </Card>
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>{ user?.info?.weight }{ " " }{ t("weight:unit") }</strong>
          { t("weight") }
        </Card>
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>{ user?.info?.age }{ t("age:unit") }</strong>
          { t("age") }
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">{ t("account.title") }</h3>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("account.personalData") }</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <StarIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("account.achievement") }</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <ChartPieIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("account.activityHistory") }</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <ChartBarSquareIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("account.workoutProgress") }</span>
            <ArrowRightIcon className="size-5" />
          </button>
        </Card>
      </section>
      <section>
        <Card>
          <PopUpNotification
            title={ t("notification.title") }
            text={t("notification.popUpNotification")}
          />
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">{ t("other.title") }</h3>
          <Link href={ PAGES.CONTACT_US } className="btn btn-ghost w-full">
            <EnvelopeIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("other.contactUs") }</span>
            <ArrowRightIcon className="size-5" />
          </Link>
          <Link href={ PAGES.PRIVACY }  className="btn btn-ghost w-full">
            <ShieldCheckIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("other.privacyPolicy") }</span>
            <ArrowRightIcon className="size-5" />
          </Link>
          <Link href={`${PAGES.PROFILE}/settings`} className="btn btn-ghost w-full">
            <Cog6ToothIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("other.settings") }</span>
            <ArrowRightIcon className="size-5" />
          </Link>
          <Logout title={t("other.logout")} />
        </Card>
      </section>
    </LayoutContent>
  )
}