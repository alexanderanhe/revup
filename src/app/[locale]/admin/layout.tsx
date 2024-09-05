import MenuAdmin from "@/app/ui/admin/MenuAdmin";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";

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
      <MenuAdmin />
      { children }
    </LayoutContent>
  );
}