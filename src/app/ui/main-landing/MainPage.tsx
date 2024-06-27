import { getTranslations } from 'next-intl/server';
import { Link } from "@/navigation";
import Image from "next/image";

import { LogoIcon } from "@/components/utils/icons";
import OpenLoginDialog from "@/app/ui/dialogs/buttons/OpenLoginDialog";
import NavHeader from "./NavHeader";

export default async function MainPage() {
  const t = await getTranslations("Home"); // Await the getTranslations function call

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <NavHeader />
      
      
      
      
      
      
      
    </div>
  );
}