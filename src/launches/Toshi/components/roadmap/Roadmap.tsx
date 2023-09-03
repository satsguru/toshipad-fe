import { Typography } from '@mui/material'

import styles from './Roadmap.module.scss'

export const Roadmap = () => (
  <div className={styles.roadmap}>
    <Typography className={styles.mainTitle}>Road Map</Typography>
    <Typography className={styles.desc}>
      Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
      Maecenas eget condimentum velit, sit amet feugiat lectus.
    </Typography>
    <Typography className={styles.desc}>
      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
      scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus
      nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
      convallis diam sit amet lacinia. Aliquam in elementum tellus.
    </Typography>
  </div>
)
