import { Button, Typography } from '@mui/material'
import { Timer } from 'components'

import styles from './Card.module.scss'

const Card = (props: {
  id: any
  banner: string
  logo: string
  tags: any
  name: string
  fundraise: string
  allocation: string
  isoTime: string
  timerStatus: string
}) => (
  <div className={styles.card}>
    <div className={styles.banner}>
      <img src={props.banner} alt="" />
    </div>

    <div className={styles.infos}>
      <div className={styles.logo}>
        <img src={props.logo} alt="" />
      </div>
      <Typography className={styles.infoTitle}>{props.name}</Typography>
      <div className={styles.longInfo}>
        <Typography className={styles.infoLeft}>Fundraise Goal</Typography>
        <Typography className={styles.infoRight}>{props.fundraise}</Typography>
      </div>
      <div className={styles.longInfo}>
        <Typography className={styles.infoLeft}>Max allocation</Typography>
        <Typography className={styles.infoRight}>{props.allocation}</Typography>
      </div>
      <div className={styles.timer}>
        <Timer isoTime={props.isoTime} timerStatus={props.timerStatus} />
      </div>

      <div className={styles.tags}>
        {props.tags.map((element: string) => {
          return (
            <Typography className={styles.tag} key={element}>
              {element}
            </Typography>
          )
        })}
      </div>
      <Button className={styles.cardBtn} href={`/project/${props.id}`}>
        <Typography>See Details</Typography>
      </Button>
    </div>
  </div>
)

export default Card
