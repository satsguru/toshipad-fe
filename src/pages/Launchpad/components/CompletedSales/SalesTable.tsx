import { Button } from 'components'
import { ProjectAbstract } from 'ProjectAbstract'
import { useState } from 'react'

import { ProjectIdoProvider } from '../../../../contexts/ProjectIdoContext'
import { SalesRow } from './SalesRow'

import styles from './completedSales.module.scss'

type SalesTableProps = {
  projects: ProjectAbstract[]
}

export const SalesTable: React.FunctionComponent<SalesTableProps> = ({
  projects
}) => {
  const [loadedProjects, setLoadedProjects] = useState<ProjectAbstract[]>([
    ...projects.slice(0, 2)
  ])

  const loadMore = () => {
    const loadedCount = loadedProjects.length
    const objectsToLoad = projects.slice(loadedCount, loadedCount + 2)
    setLoadedProjects(prev => [...prev, ...objectsToLoad])
  }

  const allLoaded = loadedProjects.length === projects.length

  return (
    <div className={styles.tableWithButton}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Project's name</th>
              <th>Type</th>
              <th>Participants</th>
              <th>Total raised</th>
              <th>IDO price</th>
              <th>Ended in</th>
            </tr>
            <tr />
          </thead>
          <tbody>
            {loadedProjects.map((project: ProjectAbstract) => (
              <ProjectIdoProvider project={project} key={project.id}>
                <SalesRow projectData={project} />
              </ProjectIdoProvider>
            ))}
          </tbody>
        </table>
      </div>

      {!allLoaded && (
        <div className={styles.buttonWrapper}>
          <Button color="grey" onClick={loadMore} text="Load more" />
        </div>
      )}
    </div>
  )
}
