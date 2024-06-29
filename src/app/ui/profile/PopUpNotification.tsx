import { BellIcon } from "@heroicons/react/24/outline"

type PopUpNotificationProps = {
  title: string;
  text: string;
}

export default function PopUpNotification({ title, text }: PopUpNotificationProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">{ title }</h3>
      <label className="btn btn-ghost w-full">
        <BellIcon className="size-5 text-primary" />
        <span className="label-text grow flex justify-start">{ text }</span>
        <input type="checkbox" className="toggle toggle-md toggle-secondary" defaultChecked={false} />
      </label>
    </>
  )
}