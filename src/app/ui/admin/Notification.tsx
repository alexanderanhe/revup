'use client'

import { User } from "@/lib/definitions";
import dynamic from "next/dynamic";
const DynamicSendNotification = dynamic(() => import("@/app/ui/admin/SendNotification"), {
  loading: () => <p>Loading...</p>,
});

function Notification({ users }: { users: any[] }) {
  return (
    <DynamicSendNotification users={users} />
  )
}

export default Notification