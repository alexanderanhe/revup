import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import ThemeToggle from "@/app/ui/profile/ThemeToggle"
import Card from "@/app/ui/Card"
import Logout from "@/app/ui/profile/Logout"
import DeleteAllCookies from "@/app/ui/profile/DeleteAllCookies"
import { getTranslations } from "next-intl/server"
import Language from "@/app/ui/profile/Language"

export default async function ProfileSettingsPage ({ params }) {
  const t = await getTranslations("Profile.other");
  const locale = params.locale;

  return (
    <LayoutContent title={t("settings")} footer>
      <section>
        <Card>
          {/* <h3 className="text-lg font-semibold">Settings</h3> */}
          <Language
            title={t("settings:language")}
            languages={t.raw("settings:languages")}
            locale={locale}
          />
          <ThemeToggle title={t("settings:theme")} />
          <DeleteAllCookies title={t("settings:deleteCookies")} />
          <Logout title={t("settings:logout")} />
        </Card>
      </section>
    </LayoutContent>
  )
}