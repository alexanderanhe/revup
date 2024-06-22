export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  assessment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Question = {
  key: string,
  title: string,
  shortTitle: string,
  description?: string,
  options?: string[]
  inputs?: {
    name: string,
    title: string,
    type: string,
    placeholder: string,
    pattern?: string,
    inputmode?: string
  }[]
  multiple?: string[]
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