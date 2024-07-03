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
  const query = searchParams?.query;
  const tags = searchParams?.tags;

  if (query || tags) {
    filter.match.name = query;
    filter.filters.push({ tags });
  } else {
    filter.groupBy.push({'tags': 'muscle'});
  }

  const results = await getWorkouts(locale, filter);

  return (
    <LayoutContent title="Explore" footer>
      <Search />
      <section className="w-full p-0">
        { (query || tags) ? <Workouts workouts={results as Workout[]} /> : (
          <Groups groups={results as GroupsWorkout[]} />
        )}
      </section>
    </LayoutContent>
  )
}