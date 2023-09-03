import { Button, Typography } from '@mui/material'
import { Icons } from 'assets'

import styles from './Community.module.scss'

export const Community = () => (
  <div className={styles.community}>
    <h2 className={styles.h2}>Join our community</h2>
    <Typography className={styles.desc}>
      Be part of our journey. Follow us, stay informed, and contribute to the
      blockchain revolution. Let's shape the future together.
    </Typography>
    <div className={styles.socials}>
      <Button
        className={styles.oneSocial}
        href="https://discord.com/invite/ordinalscouncil"
        target="_blank">
        <img src={Icons.Socials.discord} alt="" />

        <Typography>Discord</Typography>
      </Button>
      <Button
        className={styles.oneSocial}
        href="https://t.me/+9eED1XpNuuNiOGM1"
        target="_blank">
        <img src={Icons.Socials.telegram} alt="" />

        <Typography>Telegram</Typography>
      </Button>
      <Button
        className={styles.oneSocial}
        href="https://twitter.com/toshipadcom"
        target="_blank">
        <img src={Icons.Socials.twitter} alt="" />

        <Typography>Twitter</Typography>
      </Button>
    </div>
  </div>
)
