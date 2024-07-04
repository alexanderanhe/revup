import LayoutContent from "@/app/ui/utils/templates/LayoutContent"
import { getWorkouts } from "@/lib/data";
import Workouts from "@/app/ui/explore/Workouts";
import Search from "@/app/ui/explore/Search";
import Groups from "@/app/ui/explore/Groups";
import { GroupsWorkout, Workout } from "@/lib/definitions";

type ExplorePageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    query?: string;
    tags?: string[];
  };
}

export default async function ExplorePage({
  params: { locale }, searchParams
}: ExplorePageProps) {
  const filter: any = { match: null, filters: [], groupBy: []}
  const query: string = searchParams?.query ?? '';
  const tags: string[] = searchParams?.tags ?? [];
  const showWorkouts = Boolean(query || tags.length);

  if (showWorkouts) {
    filter.match = { name: query };
    filter.filters.push({ tags });
  } else {
    filter.groupBy.push({'tags': 'muscle'});
  }

  const results = await getWorkouts(locale, filter);

  return (
    <LayoutContent title="Explore" showBackButton={showWorkouts} footer>
      <Search selector="query" placeholder="Search for workouts" />
      <section className="w-full p-0">
        { (showWorkouts) ? <Workouts workouts={results as Workout[]} /> : (
          <Groups groups={results as GroupsWorkout[]} />
        )}
      </section>
    </LayoutContent>
  )
}