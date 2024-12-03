import LayoutContent from '@/app/ui/utils/templates/LayoutContent'
import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage() {
  return <LayoutContent
    title="Sign Up"
    // showBackButton={showWorkouts}
    // pageMenu={<Menu tags={allTags} />}
    className="min-h-svh"
  >
    <div className="flex items-center justify-center w-full">
      <SignUp />
    </div>
  </LayoutContent>
}