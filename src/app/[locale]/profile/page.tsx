import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import { ArrowRightIcon, ChartBarSquareIcon, ChartPieIcon, Cog6ToothIcon, EnvelopeIcon, StarIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"

import Card from "@/app/ui/Card"
import { Link } from "@/navigation"
import { auth } from "@/auth"
import ProfileImage from "@/app/ui/utils/ProfileImage"
import { Measurements, User } from "@/lib/definitions"
import { getTranslations } from "next-intl/server"
import { PencilIcon } from "@heroicons/react/24/solid"
import Logout from "@/app/ui/profile/Logout"
import { PAGES } from "@/lib/routes"
import PopUpNotification from "@/app/ui/profile/PopUpNotification"
import ProfileNavImage from "@/app/ui/utils/menus/ProfileNavImage"

import dynamic from "next/dynamic";
import MeasurementsDrawer from "@/app/ui/dialogs/Measurements"
import { PencilRulerIcon, ShieldIcon } from "lucide-react"
const DynamicShareButton = dynamic(() => import("@/app/ui/profile/ShareButton"), {
  ssr: false,
});

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as User;
  const t = await getTranslations("Profile");
  const tAssessmentOpts = await getTranslations("Assessment.options");

  const measurements = [{
    weight: user?.info?.weight,
    height: user?.info?.height,
    created_at: new Date()
  }] as Measurements[];

  return (
    <LayoutContent title={t("title")} footer>
      <ProfileNavImage user={user} subtitle={ tAssessmentOpts(`goal:${user?.info?.goal}`) }>
        <Link href={`${PAGES.PROFILE}/edit`} className="btn btn-sm">
          <PencilIcon className="size-4" />
          { t("editBtn") }
        </Link>
      </ProfileNavImage>
      <section className="grid grid-cols-3">
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>{ user?.info?.height }{ " " }{ t("height:unit") }</strong>
          { t("height") }
        </Card>
        <MeasurementsDrawer measurements={measurements}>
          <Card className="cursor-pointer [&>strong]:text-primary [&>strong]:font-medium">
            <strong>{ user?.info?.weight }{ " " }{ t("weight:unit") }</strong>
            { t("weight") }
          </Card>
        </MeasurementsDrawer>
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
          <MeasurementsDrawer measurements={measurements}>
            <button type="button" className="btn btn-ghost w-full">
              <PencilRulerIcon className="size-5 text-primary" />
              <span className="grow flex justify-start">{ t("account.measurements") }</span>
              <ArrowRightIcon className="size-5" />
            </button>
          </MeasurementsDrawer>
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
          <DynamicShareButton>{ t("other.share") }</DynamicShareButton>
          <Link href={`${PAGES.PROFILE}/settings`} className="btn btn-ghost w-full">
            <Cog6ToothIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">{ t("other.settings") }</span>
            <ArrowRightIcon className="size-5" />
          </Link>
          <Logout title={t("other.logout")} />
        </Card>
      </section>
      { user?.info?.admin && (
        <section>
          <Card className="border-[#0099ff]">
            <h3 className="text-lg font-semibold">{ t("other.admin") }</h3>
            <Link href={ PAGES.ADMIN } className="btn btn-ghost w-full">
              <ShieldIcon className="size-5 text-primary" />
              <span className="grow flex justify-start">{ t("other.admin") }</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </Card>
        </section>
      )}
    </LayoutContent>
  )
}