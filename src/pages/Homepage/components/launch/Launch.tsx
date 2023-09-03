import { Button, Typography } from '@mui/material'
import { Timer } from 'components'
import { useContext } from 'react'

import { ProjectIdoContext } from '../../../../contexts/ProjectIdoContext'
import { satoshiFormat } from '../../../../utils/SatoshiFormat'

import styles from './Launch.module.scss'

export const Launch = ({ project }: any) => {
  const projectApiData = useContext(ProjectIdoContext)
  const dateToCount = project.isLive()
    ? project.registrationEndDateTime
    : project.isUpcoming()
    ? project.registrationStartDateTime
    : null

  return (
    <div className={styles.launch}>
      <h2 className={styles.h2}>{project.name} Launch</h2>
      <div className={styles.card}>
        <div className={styles.mobileBanner}>
          <img src={project.banner} alt="" />
        </div>
        <div className={styles.left}>
          <img src={project.logo} className={styles.leftLogo} alt="" />
          <Typography className={styles.title}>
            {project.name} Launch
          </Typography>
          <Typography className={styles.desc}>{project.description}</Typography>
          <div className={styles.infos}>
            <div className={styles.oneInfo}>
              <Typography className={styles.leftInfo}>Token Price</Typography>
              <Typography className={styles.rightInfo}>
                1 {project.tokenTicker} ={' '}
                {`${satoshiFormat(project.tokenPrice)}`}
              </Typography>
            </div>
            <div className={styles.oneInfo}>
              <Typography className={styles.leftInfo}>
                Total Investors
              </Typography>
              <Typography className={styles.rightInfo}>
                {projectApiData.participants}
              </Typography>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button
              className={`${styles.btn} ${styles.leftBtn}`}
              href={`/project/${project.id}`}>
              <Typography>Project Details</Typography>
            </Button>

            {project.whitepaperUrl && (
              <Button
                className={`${styles.btn} ${styles.rightBtn}`}
                href={project.whitepaperUrl}
                target="_blank">
                <Typography>Whitepaper</Typography>
              </Button>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightBanner}>
            <img src={project.banner} alt="" />
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomInfo}>
              <Typography className={styles.raised}>Raised</Typography>
              <Typography className={styles.amount}>
                {satoshiFormat(projectApiData.totalRaised, true)}
              </Typography>
              <Typography className={styles.coin}>Sats</Typography>
            </div>
            <div className={styles.timer}>
              <Timer
                isoTime={dateToCount}
                timerStatus={project.timerStatus()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
