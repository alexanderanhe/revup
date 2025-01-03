'use client'

import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { AbstractIntlMessages, NextIntlClientProvider, useLocale } from 'next-intl'

export default function Providers({
  messages,
  timeZone,
  children
}: {
  messages: AbstractIntlMessages;
  timeZone: string;
  children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <Provider store={store}>
      <NextIntlClientProvider timeZone={timeZone} locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  )
}