import { ProjectAbstract } from 'ProjectAbstract'

import { HeaderWithText } from '../HeaderWithText'
import { SalesTable } from './SalesTable'

import styles from './completedSales.module.scss'

type CompletedSalesProps = {
  projects: ProjectAbstract[]
}
export const CompletedSales: React.FunctionComponent<CompletedSalesProps> = ({
  projects
}) => (
  <>
    {projects.length > 0 && (
      <div className={styles.completedCont}>
        <HeaderWithText title="Completed Projects" subtitle="" />

        <SalesTable projects={projects} />
      </div>
    )}
  </>
)
