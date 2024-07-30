import { User } from "@/lib/definitions";
import { getTranslations } from "next-intl/server";
import { getStatsWeight } from "@/lib/data";
import EditDashboard from "@/app/ui/home/EditDashboard";

import * as dashboardComponents from "./dashboard/";

const fetchs: {[key: string]: any} = {
  MyWeight: getStatsWeight,
  Recommendations: async () => null,
}

export default async function Dashboard ({ user, locale }: { user?: User, locale: string}) {
  if (!user) {
    return null;
  }

  const t = await getTranslations("Home");
  const t_dashboard = t.raw("dashboard");
  const dashboardItems = Object.keys(t_dashboard)
    .map((key) => ({
      id: key,
      name: t_dashboard[key].title,
      category: user.info?.dashboard?.includes(key) ? 1 : 2,
      Component: dashboardComponents[key as keyof typeof dashboardComponents] ?? null,
      async fetchData() {
        if (fetchs[key]) {
          return await fetchs[key]();
        }
        return null;
      }
    }));
  return (
    <>
      { dashboardItems.filter((di) => di.category === 1).map(async ({ id, Component, fetchData }) => (
          <Component key={id} translate={ t_dashboard[id] } data={await fetchData()} />
      ))}
      <EditDashboard dashboardItems={dashboardItems.map(({id, name, category}: {id: string, name: any, category: string | number}) => ({id, name, category: parseInt(`${category}`)}))} />
    </>
  )
}