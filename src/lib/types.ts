export type DemoType = "appetize" | "snack" | "youtube" | "none"

export interface Project {
  title: string
  slug: string
  role?: string
  short: string
  tech: string[]
  highlights?: string[]
  cover: string
  demo: { type: DemoType; url?: string }
  repo?: string
  featured?: boolean
}
