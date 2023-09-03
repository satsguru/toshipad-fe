import { Gur1 } from './launches/Gur1/config'
import { Toshi } from './launches/Toshi/config'
import { ProjectAbstract } from './ProjectAbstract'

export const LaunchProjects: Record<TProjectName, ProjectAbstract> = {
  gur1: new Gur1(),
  toshi: new Toshi()
}

export type TProjectName = 'gur1' | 'toshi'
