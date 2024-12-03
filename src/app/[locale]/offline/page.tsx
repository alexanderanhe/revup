import React from 'react'
import LayoutContent from '@/app/ui/utils/templates/LayoutContent'
import { getTranslations } from 'next-intl/server';

export default async function OfflinePage() {
  const t = await getTranslations("Offline");
  return (
    <LayoutContent title={t("title")} footer>
      <div>{t("description")}</div>
    </LayoutContent>
  )
}
