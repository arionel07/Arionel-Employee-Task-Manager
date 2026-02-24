import { DEFAULT_THEME } from '@/config/theme.config'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<string>('theme', DEFAULT_THEME)
