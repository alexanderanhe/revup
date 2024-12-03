import LayoutContent from '@/app/ui/utils/templates/LayoutContent'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <LayoutContent
    title="Sign In"
    // showBackButton={showWorkouts}
    // pageMenu={<Menu tags={allTags} />}
    className="min-h-svh"
  >
    <div className="flex items-center justify-center w-full">
      <SignIn />
    </div>
  </LayoutContent>
}