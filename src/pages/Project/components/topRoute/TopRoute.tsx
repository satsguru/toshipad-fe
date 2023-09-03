import { Icons } from 'assets'
import { Link } from 'react-router-dom'

import styles from './TopRoute.module.scss'

export const TopRoute = ({ project }: any) => (
  <div className={styles.topRoute}>
    <Link to="/">Home</Link>
    <img src={Icons.arrowRight} className={styles.arrow} alt="" />
    <Link to="/launchpad">Launchpad</Link>
    <img src={Icons.arrowRight} className={styles.arrow} alt="" />
    <Link to={`/project/${project.id}`}>{project.name}</Link>
  </div>
)
