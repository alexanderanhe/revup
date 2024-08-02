import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import ThemeToggle from "@/app/ui/profile/ThemeToggle"
import Card from "@/app/ui/Card"
import DeleteAllCookies from "@/app/ui/profile/DeleteAllCookies"
import { getTranslations } from "next-intl/server"
import Language from "@/app/ui/profile/Language"

type ProfileSettingsPageProps = {
  params: {
    locale: string;
  }
}
export default async function ProfileSettingsPage ({ params }: ProfileSettingsPageProps) {
  const t = await getTranslations("Profile.other");
  const locale = params.locale;

  return (
    <LayoutContent title={t("settings")} footer>
      <section>
        <Card>
          {/* <h3 className="text-lg font-semibold">Settings</h3> */}
          <ThemeToggle title={t("settings:theme")} />
          <Language
            title={t("settings:language")}
            languages={t.raw("settings:languages")}
            locale={locale}
          />
        </Card>
      </section>
      <section>
        <Card>
          {/* <h3 className="text-lg font-semibold">Danger Zone</h3> */}
          <DeleteAllCookies title={t("settings:deleteCookies")} />
        </Card>
      </section>
    </LayoutContent>
  )
}