import { boolean } from "zod";

export type User = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  image: string;
  password: string;
  theme: string;
  assessment?: boolean;
  onboarding?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type AdapterUserInfo = {
  theme: string;
  assessment: boolean;
  onboarding: boolean;
}

export type Question = {
  key: string,
  title?: string,
  shortTitle?: string,
  description?: string,
  options?: string[]
  inputs?: {
    name: string,
    type: string,
    placeholder: string,
    pattern?: string,
    inputmode?: string,
    optional: boolean
  }[]
  multiple?: [string, boolean][]
}

export type MenuNavLinks = {
  name: string,
  href: string,
  current: string[],
  Icon?: any
}

export type CalendarContent = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  active: boolean;
}
export type CalendarDayContent = {
  day: Date;
  content: CalendarContent[];
}

export type AuthProvider = {
  id: string;
  image: string;
}

export type Providers = 'Google' | 'Facebook' | 'GitHub' | 'X';
export type AuthProviders = {
  [key in Providers]: AuthProvider
}
export const THEMES = ['default', 'light', 'dark', 'pastel', 'cmyk'];