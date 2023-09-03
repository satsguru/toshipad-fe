import { Container, Flex, ProjectCardTemplate } from 'components'
import { ProjectAbstract } from 'ProjectAbstract'

import { ProjectIdoProvider } from '../../../../contexts/ProjectIdoContext'
import { HeaderWithText } from '../HeaderWithText'

import styles from '../LaunchpadCommon.module.scss'

type UpcomingSalesProps = {
  projects: ProjectAbstract[]
}

export const UpcomingSales: React.FunctionComponent<UpcomingSalesProps> = ({
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
          <HeaderWithText title="Upcoming Projects" subtitle="" />

          <Flex className={cardsContainerClass}>
            {projects.map(project => (
              <ProjectIdoProvider project={project} key={project.id}>
                <ProjectCardTemplate project={project} />
              </ProjectIdoProvider>
            ))}
          </Flex>
        </Container>
      )}
    </>
  )
}
