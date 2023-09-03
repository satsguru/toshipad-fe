import { Button, Typography } from '@mui/material'
import { Icons, Images } from 'assets'

import styles from './Hero.module.scss'

export const Hero = () => (
  <div className={styles.hero}>
    <img src={Images.heroPlanet} className={styles.planet} alt="" />
    <h1 className={styles.h1}>The BRC-20 Launchpad</h1>
    <h3 className={styles.h3}>
      Toshipad is the groundbreaking launchpad for BRC-20 tokens, igniting a new
      era in Bitcoin’s blockchain advancement.
    </h3>
    <div className={styles.bottom}>
      <Button className={styles.leftBtn} href="/launchpad">
        <Typography>Upcoming sales</Typography>
      </Button>
      <div className={styles.rightBtns}>
        <Button
          className={styles.rightBtn}
          href="https://discord.com/invite/ordinalscouncil"
          target="_blank">
          <img src={Icons.Socials.discord} alt="Discord" />
        </Button>
        <Button
          className={styles.rightBtn}
          href="https://t.me/+9eED1XpNuuNiOGM1"
          target="_blank">
          <img src={Icons.Socials.telegram} alt="Telegram" />
        </Button>
        <Button
          className={styles.rightBtn}
          href="https://twitter.com/toshipadcom"
          target="_blank">
          <img src={Icons.Socials.twitter} alt="Twitter" />
        </Button>
      </div>
    </div>
  </div>
)
