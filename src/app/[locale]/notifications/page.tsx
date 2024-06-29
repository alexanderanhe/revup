import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Notification from "@/app/ui/notifications/Notification";
import MenuNotifications from "@/app/ui/notifications/MenuNotifications";

export default function NotificationsPage() {
  return (
    <LayoutContent
      title="Notifications"
      pageMenu={<MenuNotifications />}
    >
      <section className="space-y-2">
        <Notification id={1} title="Hey, it’s time for lunch" description="About 1 minutes ago" />
        <Notification id={2} title="Don’t miss your lowerbody workout" description="About 3 hours ago" />
        <Notification id={3} title="Hey, let’s add some meals for your breakfast to be healthy" description="About 3 hours ago" />
        <Notification id={3} title="Congratulations, You have finished A hvery difficult rutine" description="29 May" />
        <Notification id={3} title="Hey, it’s time for lunch" description="8 April" image="/images/notification_example.svg" />
      </section>
    </LayoutContent>
  )
}