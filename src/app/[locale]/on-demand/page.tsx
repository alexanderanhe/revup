import LayoutContent from "@/components/templates/LayoutContent"
import Discover from "@/components/on-demand/Discover"
import { fetchMedia } from "@/lib/data";

export default async function OnDemandPage() {
  const media = await fetchMedia();

  return (
    <LayoutContent title="On-demand" className="grid-rows-[auto_1fr] place-items-start bg-primary-muted" footer>
      <section className="grid place-items-start p-0">
        <Discover media={media} />
      </section>
    </LayoutContent>
  )
}