import { Button, Typography } from '@mui/material'
import { Icons } from 'assets'
import { ModalTabs } from 'constants/index'
import { TailSpin } from 'react-loader-spinner'

import styles from './Confirmations.module.scss'

export const Confirmations = (props: { setTab: any }) => {
  return (
    <div className={styles.section}>
      <div className={styles.top}>
        <div className={styles.spinner}>
          <TailSpin color="#ffffff" />
        </div>
        <div className={styles.topTexts}>
          <Typography className={styles.title}>
            Waiting For Confirmations (1/10)
          </Typography>
          <Typography className={styles.desc}>
            Transaction time can be very long up to <span>8 hours</span> you
            will receive notification when transaction end
          </Typography>
        </div>
      </div>

      <div className={styles.qrInfo}>
        <div className={styles.qrLeft}>
          <div className={styles.qrCode}>
            <img src="https://i.imgur.com/gdjNFy4.png" alt="" />
          </div>
          <div className={styles.texts}>
            <Typography className={styles.qrTitle}>TX Hash</Typography>
            <Typography className={styles.qrDesc}>
              0xB0D502E938ed5f4df2E681fE6E419ff29631d62b
            </Typography>
          </div>
        </div>
        <div className={styles.copy}>
          <img src={Icons.copy} alt="" />
        </div>
      </div>
      <div className={styles.bottomInfos}>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Currently Minting</Typography>
          <Typography className={styles.rightInfo}>
            Silver Bucket (Max $1000)
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Mint Price</Typography>
          <Typography className={styles.rightInfo}>Free</Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Service Fee</Typography>
          <Typography className={styles.rightInfo}>
            0.000111111BTC ($2.9)
          </Typography>
        </div>
        <div className={styles.infoLine} />
        <div className={`${styles.oneInfo} ${styles.summary}`}>
          <Typography className={styles.leftInfo}>Total</Typography>
          <Typography className={styles.rightInfo}>
            0.00048291 BTC ($12.7)
          </Typography>
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <Button
          className={`${styles.btn}`}
          onClick={() => {
            props.setTab(ModalTabs.TransactionSummary)
          }}>
          <Typography>Back</Typography>
        </Button>
        <Button
          className={`${styles.btn} ${styles.rightBtn}`}
          onClick={() => {
            props.setTab(ModalTabs.TransactionSuccess)
          }}>
          <Typography>Next</Typography>
        </Button>
      </div>
    </div>
  )
}
