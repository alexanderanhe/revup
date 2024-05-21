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
    placeholder: string
  }[]
  multiple?: string[]
}

export type MenuNavLinks = {
  name: string,
  href: string,
  current: string[],
  Icon?: any
}