import { ProjectCardTemplate } from 'components'

import { ProjectAbstract } from '../../../../ProjectAbstract'

type ProjectCardProps = {
  project: ProjectAbstract
}
export const OngoingProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  project
}) => <ProjectCardTemplate project={project} />
