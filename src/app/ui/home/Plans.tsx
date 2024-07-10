import { getUserPlans } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import PlanItem from "@/app/ui/home/PlanItem";

import { User } from "next-auth";
import { Plan } from "@/lib/definitions";

export default async function Plans({ user, locale }: { user?: User, locale: string}) {
  if (!user) {
    return null;
  }
  const t = await getTranslations("Workout");
  const userPlans = await getUserPlans(user, locale) as Plan[];

  return (
    <div className="join join-vertical w-full">
      { userPlans.map((plan, index) => (
        <PlanItem key={`plan${plan.id}`} plan={plan} index={index} t={t} />
      ))}
    </div>
  )
}