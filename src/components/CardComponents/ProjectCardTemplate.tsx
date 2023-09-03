import { Button, Header, Timer } from 'components'
import { useContext } from 'react'

import { ProjectIdoContext } from '../../contexts/ProjectIdoContext'
import { ProjectAbstract } from '../../ProjectAbstract'
import { BannerWithLogo } from './BannerWithLogo'
import { Stats } from './Stats'
import { Tags } from './Tags'

import './_styles.scss'

type ProjectCardProps = {
  project: ProjectAbstract
}

export const ProjectCardTemplate: React.FunctionComponent<ProjectCardProps> = ({
  project
}) => {
  const isOngoing = project.isLive()
  const projectApiData = useContext(ProjectIdoContext)
  return (
    <div className={'projectCard'}>
      <div className="cardMainContent">
        <BannerWithLogo bannerUrl={project.banner} logoUrl={project.logo} />

        <div className={'projectCardDetails'}>
          <Header size="md">{project.name}</Header>

          <Stats
            title1={isOngoing ? 'Raised' : 'Fundraise Goal'}
            value1={
              isOngoing ? projectApiData.totalRaised : projectApiData.raiseGoal
            }
            title2={isOngoing ? 'Goal' : 'Max Allocation'}
            value2={isOngoing ? projectApiData.raiseGoal : projectApiData.Gold}
          />

          <Timer
            isoTime={
              project.isLive()
                ? project.registrationEndDateTime
                : project.registrationStartDateTime
            }
            timerStatus={project.timerStatus()}
          />
          <Tags tags={project.tags} />
        </div>
      </div>
      <Button
        text={'See details'}
        color={isOngoing ? 'primary' : 'black'}
        href={`/project/${project.id}`}
      />
    </div>
  )
}
