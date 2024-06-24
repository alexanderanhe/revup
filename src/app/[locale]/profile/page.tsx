import LayoutContent from "@/components/templates/LayoutContent"
import ThemeToggle from "@/app/ui/utils/ThemeToggle"

const ProfilePage = () => {
  return (
    <LayoutContent title="Profile" bg="blur bg-[url('/images/pngegg_4.webp')]" head footer>
      <section className="grid grid-cols-autofit place-items-center">
        <ThemeToggle />
      </section>
    </LayoutContent>
  )
}

export default ProfilePage