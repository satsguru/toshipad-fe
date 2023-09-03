import { Container } from 'components'
import { ProjectAbstract } from 'ProjectAbstract'

import { ProjectIdoProvider } from '../../../../contexts/ProjectIdoContext'
import { HeaderWithText } from '../HeaderWithText'
import { OngoingProjectCard } from './OngoingProjectCard'

import styles from '../LaunchpadCommon.module.scss'

type OngoingSalesProps = {
  projects: ProjectAbstract[]
}

export const OngoingSales: React.FunctionComponent<OngoingSalesProps> = ({
  projects
}) => {
  const singleCardClass = projects.length === 1 ? styles.singleCard : ''
  const cardsContainerClass = `${styles.salesCards} ${singleCardClass}`

  return (
    <>
      {projects.length > 0 && (
        <Container
          padding={[false]}
          direction="column"
          className={styles.salesCont}>
          <HeaderWithText title="Projects in progress" subtitle="" />
          <div className={cardsContainerClass}>
            {projects.map(project => {
              return (
                <ProjectIdoProvider project={project} key={project.id}>
                  <OngoingProjectCard project={project} />
                </ProjectIdoProvider>
              )
            })}
          </div>
        </Container>
      )}
    </>
  )
}
