import { LaunchProjects } from 'launchConfig'
import { ProjectAbstract } from 'ProjectAbstract'

import {
  CompletedSales,
  HeroSection,
  OngoingSales,
  Subscribe,
  UpcomingSales
} from './components'

import styles from './components/LaunchpadCommon.module.scss'

export const Launchpad = () => {
  const projects = Object.values(LaunchProjects)
  const upcoming = projects.filter((project: ProjectAbstract) =>
    project.isUpcoming()
  )
  const ongoing = projects.filter((project: ProjectAbstract) =>
    project.isLive()
  )
  const completed = projects.filter((project: ProjectAbstract) =>
    project.isCompleted()
  )

  return (
    <div className={styles.mainPage}>
      <HeroSection />
      <OngoingSales projects={ongoing} />
      <UpcomingSales projects={upcoming} />
      <CompletedSales projects={completed} />
      <Subscribe />
    </div>
  )
}
