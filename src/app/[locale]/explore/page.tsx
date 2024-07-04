import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Search from "@/app/ui/explore/Search";
import List from "@/app/ui/explore/List";
import { FilterSearchParams } from "@/lib/definitions";
import { Suspense } from "react";
import Menu from "@/app/ui/explore/Menu";
import Skeleton from "@/app/ui/explore/Skeleton";
import { getTranslations } from "next-intl/server";

type ExplorePageProps = {
  params: {
    locale: string;
  };
  searchParams?: FilterSearchParams;
}

export default async function ExplorePage({
  params: { locale }, searchParams
}: ExplorePageProps) {
  const t = await getTranslations("Explore");
  const showWorkouts = searchParams && Boolean((searchParams?.query ?? '') || (searchParams?.tags ?? []).length);

  return (
    <LayoutContent
      title={ t("title") }
      showBackButton={showWorkouts}
      pageMenu={<Menu />}
      className="min-h-svh"
      footer
    >
      <Search selector="query" placeholder="Search for workouts" />
        <Suspense fallback={<Skeleton />}>
          <List searchParams={searchParams} locale={locale} />
        </Suspense>
    </LayoutContent>
  )
}