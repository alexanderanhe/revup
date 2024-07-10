import { Link } from "@/navigation";
import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline";

export default async function NotificationsButton() {
  const indicator = 0;
  return (
    <Link href="/notifications" className="btn btn-ghost btn-square">
      <div className="indicator">
        { !indicator ? <BellIcon className="size-5" /> : (
          <>
            <BellAlertIcon className="size-5" />
            <span className="badge badge-sm badge-primary indicator-item">{ indicator }</span>
          </>
        )}
      </div>
    </Link>
  )
}