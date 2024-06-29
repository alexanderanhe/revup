import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type NotificationProps = {
  id: string | number;
  title: string;
  description: string;
  image?: string;
}

export default function Notification({id, image, title, description}: NotificationProps) {
  return (
    <>
      <article className="grid grid-cols-[auto_1fr_auto] place-items-center gap-4 w-full">
        <div className="avatar">
          <div className="size-10 rounded-full bg-base-300">
            { image && <Image className="w-full" width={40} height={40} src={image} alt={title} /> }
          </div>
        </div>
        <div className="grid grid-rows-2 place-items-start gap-2 w-full">
          <div className="font-medium truncate overflow-hidden w-full">
            { title }
          </div>
          <p className="truncate overflow-hidden w-full">{ description }</p>
        </div>
        <button type="button" className="btn btn-sm btn-ghost">
          <EllipsisVerticalIcon className="size-5" />
        </button>
      </article>
      <div className="h-px w-full bg-[#DDDADA]"></div>
    </>
  )
}