import LayoutContent from "@/components/templates/LayoutContent"
import ThemeToggle from "@/components/utils/ThemeToggle"

const ProfilePage = () => {
  return (
    <LayoutContent title="Profile">
      <section className="grid grid-cols-autofit place-items-center">
        <ThemeToggle />
      </section>
    </LayoutContent>
  )
}

export default ProfilePage