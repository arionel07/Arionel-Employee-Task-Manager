import type { IProject } from '@/types/entities/project.entities'
import { atom } from 'jotai'

export const projectsAtom = atom<IProject[]>([])
export const currentProjectAtom = atom<IProject | null>(null)
