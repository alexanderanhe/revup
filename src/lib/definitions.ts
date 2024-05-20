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