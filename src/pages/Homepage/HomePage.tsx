import { Images } from 'assets'
import { Council, Partners } from 'components'
import { LaunchProjects } from 'launchConfig'

import { ProjectIdoProvider } from '../../contexts/ProjectIdoContext'
import { Community, Hero, Launch, Projects } from './components'

import styles from './home-page.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.shadow1}>
        <img src={Images.bgShadow} alt="" />
      </div>

      <Hero />
      {Object.keys(LaunchProjects).map(key => {
        const project = LaunchProjects[key as keyof typeof LaunchProjects]

        if (project.isLive() === true) {
          return (
            <ProjectIdoProvider project={project}>
              <Launch project={project} />
            </ProjectIdoProvider>
          )
        } else return false
      })}

      <Projects />
      <Council bottomShadow={false} />
      <Partners />
      <Community />
    </div>
  )
}
