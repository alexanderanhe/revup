'use client'

import React from 'react'
import LayoutContent from '@/app/ui/utils/templates/LayoutContent'
import { useTranslations } from 'next-intl';

export default function OfflinePage() {
  const t = useTranslations("Offline");
  return (
    <LayoutContent title={t("title")} footer>
      <div>{t("description")}</div>
    </LayoutContent>
  )
}
