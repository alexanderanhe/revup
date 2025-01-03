export const PAGES = {
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/sign-in',
  SIGN_UP: '/sign-up',
  ON_BOARDING: '/on-boarding',
  ASSESSMENT: '/assessment',
  EXPLORE: '/explore',
  EXERCISES: '/exercises',
  WORKOUT: '/workout',
  PROFILE: '/profile',
  CONTACT_US: '/contact-us',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-service',
  COOKIES: '/cookie-policy',
  ADMIN: '/admin',
}

export const ROOT = PAGES.ROOT;
export const PUBLIC_ROUTES = [
  PAGES.ROOT,
  `${PAGES.LOGIN}(.*)`,
  `${PAGES.SIGN_UP}(.*)`,,
  PAGES.ON_BOARDING,
  // PAGES.HOME,
  // PAGES.ASSESSMENT,
  PAGES.EXPLORE,
  PAGES.WORKOUT,
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
  "/contact",
  "/about",
  "/help",
  PAGES.PRIVACY,
  PAGES.TERMS,
  PAGES.COOKIES,
  "/end-user-license-agreement"
];
export const DEFAULT_REDIRECT = PAGES.HOME;
export const UNAUTHORIZED_REDIRECT = PAGES.LOGIN;