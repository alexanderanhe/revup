import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { PAGES } from "@/lib/routes";
import { Link } from "@/navigation";

type HomeLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function AdminLayout({ children, params: { locale } }: HomeLayoutProps) {

  return (
    <LayoutContent
      title="Admin"
      footer
      pullToRefresh
    >
      <ul className="flex flex-wrap gap-2">
        <li><Link className="btn btn-sm" href={`${PAGES.ADMIN}/notification`} replace>Notification</Link></li>
        <li><Link className="btn btn-sm" href={`${PAGES.ADMIN}/notion`} replace>Notion Sync</Link></li>
        <li><Link className="btn btn-sm" href={`${PAGES.ADMIN}/images`} replace>Cloudflare Images</Link></li>
      </ul>
      { children }
    </LayoutContent>
  );
}