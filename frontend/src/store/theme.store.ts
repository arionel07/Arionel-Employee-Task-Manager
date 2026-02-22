import { DEFAULT_THEME } from '@/config/theme.config'
import { atom } from 'jotai'

export const themeAtom = atom<string>(DEFAULT_THEME)
