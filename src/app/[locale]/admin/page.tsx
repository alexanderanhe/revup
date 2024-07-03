import { getNotionUserList, getPage } from '@/lib/notion'
import React from 'react'

export default async function AdminPage() {
  // const userList = await getNotionUserList();
  // console.log(userList);
  const page = await getPage();
  console.log(page);
  return (
    <pre>{JSON.stringify(page)}</pre>
  )
}