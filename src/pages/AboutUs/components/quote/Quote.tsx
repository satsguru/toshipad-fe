import { Typography } from '@mui/material'
import { Icons, Images } from 'assets'

import styles from './Quote.module.scss'

export const Quote = () => (
  <div className={styles.quote}>
    <img className={styles.quoteBg} src={Images.dots} alt="" />
    <Typography className={styles.title}>
      The BRC20 market is a ‘Blue Ocean’ type of industry that is rapidly
      growing RIGHT NOW and offers vast untapped potential.
    </Typography>
    <img className={styles.quoteImg} src={Icons.quote} alt="" />
    <Typography className={styles.desc}>
      The unknown market space, untainted by competition. In blue oceans, demand
      is created rather than fought over. There is ample opportunity for growth
      that is both profitable and rapid. In blue oceans, competition is
      irrelevant because the rules of the game are waiting to be set.
    </Typography>
    <Typography className={styles.sign}>Blue ocean</Typography>
  </div>
)
