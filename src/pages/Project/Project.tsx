import { Images } from 'assets'
import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { ProjectIdoProvider } from '../../contexts/ProjectIdoContext'
import { LaunchProjects, TProjectName } from '../../launchConfig'
import { Modal } from '../Modal'
import { Banner, RightTab, TabSelect, TopInfo, TopRoute } from './components'

import styles from './Project.module.scss'

export const Project = () => {
  const { projectName }: { projectName: TProjectName } = useParams()
  const [openedTab, setTab] = useState<string>('About Project')
  const project = LaunchProjects[projectName]
  if (!project) {
    return <Redirect to={'/launchpad'} />
  }

  return (
    <ProjectIdoProvider project={project}>
      <div className={styles.main}>
        <div className={styles.shadow1}>
          <img src={Images.bgShadow} alt="" />
        </div>
        <div className={styles.inside}>
          <TopRoute project={project} />
          <TopInfo project={project} />
          <div className={styles.bottom}>
            <div className={styles.left}>
              <Banner src={project.banner} />
              <div className={styles.rightMobile}>
                <RightTab project={project} />
              </div>
              <TabSelect openedTab={openedTab} setTab={setTab} />
              {openedTab === 'About Project' ? (
                <project.DescriptionComponent />
              ) : (
                <></>
              )}
              {openedTab === 'Road Map' ? <project.RoadMapComponent /> : <></>}
              {openedTab === 'Tokenomics' ? (
                <project.TokenomicsComponent />
              ) : (
                <></>
              )}
              {openedTab === 'Team' ? <project.TeamComponent /> : <></>}
            </div>
            <div className={styles.right}>
              <RightTab project={project} />
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </ProjectIdoProvider>
  )
}
