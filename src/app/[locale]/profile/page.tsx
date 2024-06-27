import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import { ArrowRightIcon, BellIcon, ChartBarSquareIcon, ChartPieIcon, Cog6ToothIcon, EnvelopeIcon, NewspaperIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"

import Card from "@/app/ui/Card"
import { Link } from "@/navigation"
import { auth } from "@/auth"
import ProfileImage from "@/app/ui/utils/ProfileImage"

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;
  return (
    <LayoutContent
      title="Profile"
      // bg="blur bg-[url('/images/pngegg_4.webp')]"
      // head
      footer
    >
      <section className="grid grid-cols-[auto_1fr_auto] gap-4">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <ProfileImage user={user} />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <h2 className="text-xl font-bold truncate overflow-hidden w-full">
            { user?.name }
          </h2>
          <p>Lose a Fat Program</p>
        </div>
        <Link href="/profile/edit" className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl min-w-20">Edit</Link>
      </section>
      <section className="grid grid-cols-3">
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>180 cm</strong>
          Height
        </Card>
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>65 kg</strong>
          Weight
        </Card>
        <Card className="[&>strong]:text-primary [&>strong]:font-medium">
          <strong>33yo</strong>
          Age
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Account</h3>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Personal Data</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <NewspaperIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Achievement</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <ChartPieIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Activity History</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <ChartBarSquareIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Workout Progress</span>
            <ArrowRightIcon className="size-5" />
          </button>
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Notification</h3>
          <label className="btn btn-ghost w-full">
            <BellIcon className="size-5 text-primary" />
            <span className="label-text grow flex justify-start">Remember me</span>
            <input type="checkbox" className="toggle toggle-md toggle-secondary" defaultChecked />
          </label>
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Other</h3>
          <button className="btn btn-ghost w-full">
            <EnvelopeIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Contact Us</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <ShieldCheckIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Privacy Policy</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <Link href="/profile/settings" className="btn btn-ghost w-full">
            <Cog6ToothIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Settings</span>
            <ArrowRightIcon className="size-5" />
          </Link>
        </Card>
      </section>
    </LayoutContent>
  )
}