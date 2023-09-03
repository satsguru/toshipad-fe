import { Typography } from '@mui/material'
import { Icons } from 'assets'

import styles from './notis.module.scss'

const data = [
  {
    text: 'Congratulations, your transaction has been successfully completed.',
    icon: Icons.noti_success,
    when: 'Now'
  },
  {
    text: 'We have received too few funds in relation to the chosen Bracket',
    icon: Icons.noti_warning,
    when: '2h ago'
  },
  {
    text: 'Are you still interested in the',
    icon: Icons.noti_question,
    when: '1h ago'
  }
]

export const Notis = () => {
  return (
    <div className={styles.notis}>
      <div className={styles.top}>
        <Typography className={styles.left}>
          {data.length} Notifications
        </Typography>
        <Typography className={styles.right}>See all</Typography>
      </div>
      <div className={styles.elements}>
        {data.map((element, index) => {
          return (
            <div className={styles.oneNoti} key={index}>
              <div className={styles.icon}>
                <img src={element.icon} alt="" />
              </div>
              <div className={styles.texts}>
                <Typography className={styles.top}>{element.text}</Typography>
                <Typography className={styles.bottom}>
                  {element.when}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
