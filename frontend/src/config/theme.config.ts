export const DEFAULT_THEME = 'light'
export const THEMES = ['light', 'dark'] as const
export type TTheme = (typeof THEMES)[number]
