import { ProjectAbstract } from 'ProjectAbstract'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { isoDateConvert } from 'utils'

import { ProjectIdoContext } from '../../../../contexts/ProjectIdoContext'
import { satoshiFormat } from '../../../../utils/SatoshiFormat'
import { NameWithLogo } from './NameWithLogo'

type SalesRowProps = {
  projectData: ProjectAbstract
}

export const SalesRow: React.FunctionComponent<SalesRowProps> = ({
  projectData
}) => {
  const history = useHistory()
  const { totalRaised, participants } = useContext(ProjectIdoContext)
  return (
    <tr
      key={projectData.id}
      onClick={() => history.push(`/project/${projectData.id}`)}>
      <td>
        <NameWithLogo logoUrl={projectData.logo} name={projectData.name} />
      </td>
      <td>{projectData.type}</td>
      <td>{participants}</td>
      <td>{satoshiFormat(totalRaised)}</td>
      <td>{satoshiFormat(projectData.tokenPrice ?? '0')}</td>
      <td>{isoDateConvert(projectData.registrationEndDateTime)}</td>
    </tr>
  )
}
