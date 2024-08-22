import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { SaveIcon } from "lucide-react";
import { redirect } from "@/navigation";

export default async function ProfileEditPage() {
  const t = await getTranslations("Profile.Edit");
  const session = await auth();
  const user = session?.user as User;

  async function update(formData: FormData) {
    'use server'
    // Mutate data

    const data = {
      name: formData.get('name') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      birthdate: formData.get('birthdate') as string,
    }
    console.log({data})
    redirect('/profile')
  }

  const Menu =
    <button className="btn btn-primary btn-square md:btn-block rounded-lg">
      <span className="hidden md:flex">{t("saveBtn")}</span>
      <SaveIcon className="size-6" />
    </button>

  return (
    <form action={update}>
      <LayoutContent title={t("title")} pageMenu={Menu} footer>
        <section>
          <label className="input flex items-center gap-2 w-full">
            {t("name")}
            <input
              type="text"
              className="grow font-semibold placeholder:font-light placeholder:text-base-300"
              name="name"
              placeholder={t("namePlaceholder")}
              defaultValue={ user?.name ?? '' }
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            {t("lastName")}
            <input
              type="text"
              className="grow font-semibold placeholder:font-light placeholder:text-base-300"
              name="lastname"
              placeholder={t("lastNamePlaceholder")}
              defaultValue={ user?.lastName ?? '' }
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            {t("email")}
            <input
              type="text"
              className="grow font-semibold placeholder:font-light placeholder:text-base-300"
              name="email"
              placeholder={t("emailPlaceholder")}
              defaultValue={ user?.email ?? '' }
              readOnly
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            {t("birthdate")}
            <input
              type="text"
              className="grow font-semibold placeholder:font-light placeholder:text-base-300"
              name="birthdate"
              placeholder={t("birthdatePlaceholder")}
              defaultValue={ user?.info?.birthdate ?? '' }
            />
          </label>
        </section>
      </LayoutContent>
    </form>
  )
}