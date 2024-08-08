import ProfileImage from "@/app/ui/utils/ProfileImage";

import { User } from "@/lib/definitions";

type ProfileNavImageProps = {
  user?: User;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}
export default function ProfileNavImage({ user, subtitle, children }: ProfileNavImageProps) {
  return (
    <section className="grid grid-cols-[auto_1fr_auto] gap-4">
      <div className="avatar">
        <div className="w-12 sml:w-14 rounded-full">
          <ProfileImage user={user} />
        </div>
      </div>
      <div className="grid grid-rows-2 gap-1 sml:gap-2">
        <h2 className="text-base sml:text-xl font-bold truncate overflow-hidden w-full">
          { user?.name }
        </h2>
        <p className="truncate overflow-hidden w-full">{ subtitle }</p>
      </div>
      { children }
    </section>
  )
}