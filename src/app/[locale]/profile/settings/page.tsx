import LayoutContent from "@/components/templates/LayoutContent"
import ThemeToggle from "@/app/ui/profile/ThemeToggle"
import Card from "@/app/ui/Card"
import Logout from "@/app/ui/profile/Logout"
import DeleteAllCookies from "@/app/ui/profile/DeleteAllCookies"

const ProfilePage = () => {
  return (
    <LayoutContent head footer>
      <section>
        <Card>
          <h3 className="text-lg font-semibold">Settings</h3>
          <ThemeToggle />
          <DeleteAllCookies />
          <Logout />
        </Card>
      </section>
    </LayoutContent>
  )
}

export default ProfilePage