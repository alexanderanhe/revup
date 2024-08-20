import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Search from "@/app/ui/explore/Search";
import List from "@/app/ui/explore/List";
import { FilterSearchParams } from "@/lib/definitions";
import { Suspense } from "react";
import Menu from "@/app/ui/explore/Menu";
import Skeleton from "@/app/ui/explore/Skeleton";
import { getTranslations } from "next-intl/server";
import { getTagName, getTags } from "@/lib/data";

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
  const tagName = await getTagName(searchParams?.tags, locale) ?? t("title");
  const allTags = await getTags(null, null, locale);

  return (
    <LayoutContent
      title={ !showWorkouts ? t("title") : tagName }
      showBackButton={showWorkouts}
      pageMenu={<Menu tags={allTags} />}
      className="min-h-svh"
      footer
    >
      <Search selector="query" placeholder={ !showWorkouts ? t("search") : t("searchin", { tagName }) } />
        <Suspense fallback={<Skeleton />}>
          <List searchParams={searchParams} locale={locale} />
        </Suspense>
    </LayoutContent>
  )
}