import { Typography } from '@mui/material'
import { Icons } from 'assets'

import styles from './TopInfo.module.scss'

export const TopInfo = ({ project }: any) => (
  <div className={styles.topInfo}>
    <div className={styles.left}>
      <img src={project.logo} className={styles.logo} alt="" />
      <div className={styles.leftInfo}>
        <Typography className={styles.title}>
          {project.name} Project Details
        </Typography>
        <Typography className={styles.desc}>
          {project.shortDescription}
        </Typography>
      </div>
    </div>
    <div className={styles.right}>
      <Typography className={styles.rightText}>Follow Us</Typography>
      <div className={styles.socials}>
        {project.twitterUrl && (
          <a
            href={project.twitterUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.social}>
            <img src={Icons.Socials.twitter} alt="Twitter" />
          </a>
        )}
        {project.telegramUrl && (
          <a
            href={project.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.social}>
            <img src={Icons.Socials.telegram} alt="Telegram" />
          </a>
        )}
        {project.discordUrl && (
          <a
            href={project.discordUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.social}>
            <img src={Icons.Socials.discord} alt="Discord" />
          </a>
        )}
      </div>
    </div>
  </div>
)
