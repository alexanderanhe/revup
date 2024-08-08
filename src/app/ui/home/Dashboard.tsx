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
  const t_dashboard_keys = Object.keys(t_dashboard);
  const user_info_dashboard = user?.info?.dashboard ?? ["Recommendations", "MyWeight"];
  const orderedUniqDashbordItemKeys = user_info_dashboard.concat(t_dashboard_keys)
    .reduce((acc: string[], key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
      return acc;
    }, []);
  const dashboardItems = orderedUniqDashbordItemKeys
    .map((key) => ({
      id: key,
      name: t_dashboard[key].title,
      category: user.info?.dashboard?.includes(key) ? 1 : 2,
      Component: async () => {
        if (!dashboardComponents[key as keyof typeof dashboardComponents]) return <div />;
        let fetchData = async () => null;
        if (fetchs[key]) {
          fetchData = fetchs[key];
        }
        const Widget = dashboardComponents[key as keyof typeof dashboardComponents];
        return <Widget translate={ t_dashboard[key] } data={await fetchData()} />
      },
    }));
    const visibleDashboard = user_info_dashboard.filter((key) => t_dashboard_keys.includes(key))
  return (
    <>
      { dashboardItems.filter((di) => di.category === 1).map(async ({ id, Component }) => (
          <Component key={id} />
      ))}
      <EditDashboard dashboardItems={dashboardItems.map(({id, name, category}: {id: string, name: any, category: string | number}) => ({id, name, category: parseInt(`${category}`)}))} />
    </>
  )
}