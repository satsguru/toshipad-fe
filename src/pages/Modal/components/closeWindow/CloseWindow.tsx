import { Button, Typography } from '@mui/material'
import { ModalType, useModal } from 'contexts'

import styles from './CloseWindow.module.scss'

export const CloseWindow = (props: { setCloseWindow: any; resetTab: any }) => {
  const { closeModal } = useModal()
  return (
    <div className={styles.main}>
      <div
        className={styles.inside}
        onClick={() => {
          props.setCloseWindow(false)
        }}>
        <Typography className={styles.title}>
          Are you sure you want to leave?
        </Typography>
        <Typography className={styles.desc}>
          The IDO has a limited number of slots available, and once they are
          filled, no further participation will be possible.
        </Typography>
        <div className={styles.bottomButtons}>
          <Button
            className={`${styles.btn} ${styles.rightBtn}`}
            onClick={() => {
              props.setCloseWindow(false)
              closeModal(ModalType.PAYMENT)
              props.resetTab()
            }}>
            <Typography>Leave</Typography>
          </Button>
          <Button
            className={`${styles.btn}`}
            onClick={() => {
              props.setCloseWindow(false)
            }}>
            <Typography>Stay</Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
