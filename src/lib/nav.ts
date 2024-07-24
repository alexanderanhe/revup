// import { AnalyticsIcon, ExploreIcon, HomeIcon, ProfileIcon } from "@/components/utils/icons/";
// import { Squares2X2Icon, FilmIcon, ClockIcon, CalendarDaysIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { TrendingUp, HomeIcon, Rocket, Dumbbell, UserRoundCog } from "lucide-react"
import { MenuNavLinks } from "./definitions";

const menuNavLinks: MenuNavLinks[] = [
  { name: 'Hoy', href: '/home', current: ['nav', 'footer'], Icon: HomeIcon },
  { name: 'Assessment', href: '/assessment', current: ['nav'] },
  { name: 'Ejercicios', href: '/workout', current: ['nav'] },
  { name: 'Explore', href: '/explore', current: ['footer'], Icon: Rocket },
  { name: 'Workout', href: '/exercises', current: ['footer'], Icon: Dumbbell },
  { name: 'Logs', href: '/logs', current: ['nav', 'footer'], Icon: TrendingUp },
  { name: 'Perfil', href: '/profile', current: ['footer'], Icon: UserRoundCog },
  { name: 'About', href: '/about', current: ['nav'] },
];
export { menuNavLinks };