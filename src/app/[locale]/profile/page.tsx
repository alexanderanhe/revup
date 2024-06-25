import LayoutContent from "@/components/templates/LayoutContent"
import ThemeToggle from "@/app/ui/utils/ThemeToggle"
import Card from "@/app/ui/Card"
import { ArrowRightIcon, UserIcon } from "@heroicons/react/24/outline"

const ProfilePage = () => {
  return (
    <LayoutContent
      title="Profile"
      // bg="blur bg-[url('/images/pngegg_4.webp')]"
      head
      footer
    >
      <section className="grid grid-cols-autofit place-items-center">
        <ThemeToggle />
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
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Achievement</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Activity History</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Workout Progress</span>
            <ArrowRightIcon className="size-5" />
          </button>
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Notification</h3>
          <label className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="label-text grow flex justify-start">Remember me</span>
            <input type="checkbox" className="toggle toggle-md toggle-secondary" defaultChecked />
          </label>
        </Card>
      </section>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Other</h3>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Contact Us</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Privacy Policy</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Settings</span>
            <ArrowRightIcon className="size-5" />
          </button>
          <button className="btn btn-ghost w-full">
            <UserIcon className="size-5 text-primary" />
            <span className="grow flex justify-start">Log out</span>
            <ArrowRightIcon className="size-5" />
          </button>
        </Card>
      </section>
    </LayoutContent>
  )
}

export default ProfilePage