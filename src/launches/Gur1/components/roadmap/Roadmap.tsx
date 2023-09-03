import { Typography } from '@mui/material'

import styles from './Roadmap.module.scss'

export const Roadmap = () => (
  <div className={styles.roadmap}>
    <Typography className={styles.mainTitle}>Road Map</Typography>
    <Typography className={styles.desc}>
      We literally did everything.
    </Typography>
    <Typography className={styles.desc}>
      Are we going to suprise You? Check it out by yourself.
    </Typography>
  </div>
)
