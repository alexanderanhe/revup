'use client'

import dynamic from "next/dynamic";
const DynamicSendNotification = dynamic(() => import("@/app/ui/admin/SendNotification"), {
  loading: () => <p>Loading...</p>,
});

function Notification() {
  return (
    <DynamicSendNotification />
  )
}

export default Notification