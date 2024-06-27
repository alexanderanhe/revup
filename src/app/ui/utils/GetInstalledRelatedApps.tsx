'use client'

import { useEffect, useState } from "react";
type RelatedApp = [string, string, string];
export default function GetInstalledRelatedApps() {
  const [relatedApps, setRelatedApps] = useState<RelatedApp[]>([]);

  useEffect(() => {
    async function fetchNavigator() {
      if (!navigator) {
        const relatedApps = await (navigator as any)?.getInstalledRelatedApps();
        setRelatedApps(relatedApps ?? []);
      }
    }
    fetchNavigator();
  }, []);

  return (
    <div>
      {relatedApps.map(([platform, url, id]) => (
        <div className="flex" key={id}>
          <span>{platform}</span>
          <span>{url}</span>
          <span>{id}</span>
        </div>
      ))}
    </div>
  )
}