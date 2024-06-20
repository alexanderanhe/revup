export const PAGES = {
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  ON_BOARDING: '/on-boarding',
  ASSESSMENT: '/assessment',
}

export const ROOT = PAGES.ROOT;
export const PUBLIC_ROUTES = [
  PAGES.ROOT,
  PAGES.ON_BOARDING,
  PAGES.HOME,
  PAGES.LOGIN,
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
  "/contact",
  "/about",
  "/help",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/end-user-license-agreement"
];
export const DEFAULT_REDIRECT = PAGES.HOME;
export const UNAUTHORIZED_REDIRECT = PAGES.LOGIN;