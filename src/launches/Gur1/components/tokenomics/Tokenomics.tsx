import { Typography } from '@mui/material'

import PerfectTokenomics from './tokenomics.png'

import styles from './Tokenomics.module.scss'

export const Tokenomics = () => (
  <div className={styles.tokenomics}>
    <Typography className={styles.mainTitle}>Tokenomics</Typography>
    <img
      src={PerfectTokenomics}
      className={styles.banner}
      alt="perfect tokenomics"
    />
    <Typography className={styles.desc}>No Utility</Typography>
    <Typography className={styles.desc}>Random Supply</Typography>
    <Typography className={styles.desc}>
      100% public IDO on Beta version of Toshipad.
    </Typography>
    <Typography className={styles.desc}>Only down- no demand.</Typography>
    <Typography className={styles.desc}>
      Satsguru are the only people with power.
    </Typography>
    <Typography className={styles.desc}>No Gevernance</Typography>
  </div>
)
