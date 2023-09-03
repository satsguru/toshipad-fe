import { Button, Typography } from '@mui/material'
import { Images } from 'assets'

import styles from './Council.module.scss'

export const Council = (props: { bottomShadow: boolean }) => (
  <div className={styles.council}>
    <div className={styles.shadow}>
      <img src={Images.councilShadow} alt="" />
    </div>
    <div
      className={styles.bottom}
      style={props.bottomShadow === true ? { paddingBottom: '264px' } : {}}>
      <div className={styles.left}>
        <img className={styles.logo} src={Images.toshipadLogo} alt="ToshiPad" />

        <Typography className={styles.powered}>Powered By</Typography>
        <Typography className={styles.h1}>The Council</Typography>
        <Typography className={styles.h2}>
          Led by crypto visionaries, The Council safeguards Bitcoin's BRC20
          future. Every project is carefully selected. Join our voyage.
        </Typography>
        <Button
          className={styles.btn}
          href="https://twitter.com/ordinalscouncil"
          target="_blank">
          <Typography>Meet The Council</Typography>
        </Button>
      </div>

      <img className={styles.right} src={Images.council} alt="" />
    </div>
    {props.bottomShadow === true ? (
      <div className={styles.bottomShadow}>
        <img src={Images.councilShadow} alt="" />
      </div>
    ) : (
      false
    )}
  </div>
)
