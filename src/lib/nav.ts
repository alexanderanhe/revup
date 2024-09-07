// import { AnalyticsIcon, ExploreIcon, HomeIcon, ProfileIcon } from "@/components/utils/icons/";
// import { Squares2X2Icon, FilmIcon, ClockIcon, CalendarDaysIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { TrendingUp, HomeIcon, Rocket, Dumbbell, UserRoundCog, SquarePlayIcon } from "lucide-react"
import { MenuNavLinks } from "./definitions";

const menuNavLinks: MenuNavLinks[] = [
  { name: 'Hoy', href: '/home', current: ['nav', 'footer'], Icon: HomeIcon, animate: "animate-bounce" },
  { name: 'Assessment', href: '/assessment', current: ['nav'] },
  { name: 'Ejercicios', href: '/workout', current: ['nav'] },
  { name: 'Explore', href: '/explore', current: ['footer'], Icon: Rocket, animate: "animate-bounce" },
  { name: 'Social', href: '/social', current: ['nav', 'footer'], Icon: SquarePlayIcon },
  { name: 'Workout', href: '/exercises', current: ['footer'], Icon: Dumbbell },
  // { name: 'Logs', href: '/logs', current: ['nav', 'footer'], Icon: TrendingUp, animate: "animate-bounce" },
  { name: 'Perfil', href: '/profile', current: ['footer'], Icon: UserRoundCog, animate: "animate-bounce" },
  { name: 'About', href: '/about', current: ['nav'] },
];
export { menuNavLinks };