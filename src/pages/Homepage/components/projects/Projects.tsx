import { Button, Typography } from '@mui/material'
import { LaunchProjects } from 'launchConfig'

import { ProjectCardTemplate } from '../../../../components'
import { ProjectIdoProvider } from '../../../../contexts/ProjectIdoContext'

import styles from './Projects.module.scss'

export const Projects = () => {
  let drawed: number = 0
  let upcomingProjects: number = 0

  Object.keys(LaunchProjects).map(key => {
    const project = LaunchProjects[key as keyof typeof LaunchProjects]
    if (project.isUpcoming() === true) {
      upcomingProjects = upcomingProjects + 1
      return true
    } else return false
  })

  if (upcomingProjects > 0) {
    return (
      <div className={styles.projects}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <Typography className={styles.topTitle}>
              Upcoming Projects
            </Typography>
            <Typography className={styles.topDesc}>
              Get ready for our next consortium of highly vetted, handpicked
              projects.
            </Typography>
          </div>
          <Button className={styles.topRight} href="/launchpad">
            <Typography>Explore More Projects</Typography>
          </Button>
        </div>
        <div className={styles.bottom}>
          {Object.keys(LaunchProjects).map(key => {
            const project = LaunchProjects[key as keyof typeof LaunchProjects]

            if (project.isUpcoming() === true) {
              if (drawed < 3) {
                drawed = drawed + 1
                return (
                  <ProjectIdoProvider project={project} key={project.id}>
                    <ProjectCardTemplate project={project} />
                  </ProjectIdoProvider>
                )
              } else return false
            } else return false
          })}
        </div>
      </div>
    )
  } else return null
}
