import { Typography } from '@mui/material'

import TeamPic from './team.png'

import styles from './Team.module.scss'

export const Team = () => (
  <div className={styles.team}>
    <Typography className={styles.mainTitle}>Team</Typography>
    <Typography className={styles.desc}>
      Not doxxed team, will remain silent till date come.
    </Typography>
    <img src={TeamPic} className={styles.banner} alt="team" />
  </div>
)
