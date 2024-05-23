import { Squares2X2Icon, FilmIcon, ClockIcon, CalendarDaysIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import { MenuNavLinks } from "./definitions";
const menuNavLinks: MenuNavLinks[] = [
  { name: 'Hoy', href: '/', current: ['nav', 'footer'], Icon: Squares2X2Icon },
  { name: 'Assessment', href: '/assessment', current: ['nav'] },
  { name: 'Ejercicios', href: '/workout', current: ['nav'] },
  { name: 'On-demand', href: '/on-demand', current: ['footer'], Icon: FilmIcon },
  // { name: 'Calendario', href: '/calendar', current: ['nav', 'footer'], Icon: CalendarDaysIcon },
  { name: 'Logs', href: '/logs', current: ['nav', 'footer'], Icon: ClockIcon },
  { name: 'Ajuste', href: '/profile', current: ['footer'], Icon: Cog6ToothIcon },
];
export { menuNavLinks };