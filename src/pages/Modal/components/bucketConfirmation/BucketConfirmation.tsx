import { Button, Typography } from '@mui/material'
import BigNumber from 'bignumber.js'
import { BucketTypes, ModalTabs } from 'constants/index'

import { useProjectIdo } from '../../../../contexts/ProjectIdoContext'
import { satoshiFormat, SATOSHI_IN_BTC } from '../../../../utils/SatoshiFormat'

import styles from './BucketConfirmation.module.scss'

export const BucketConfirmation = (props: {
  setTab: any
  amountSatoshi: string
  selectedBucket: BucketTypes
}) => {
  const { fee, confirmBucket, bucketConfirmed, BTCPrice } = useProjectIdo()
  const BTCPriceNumber = new BigNumber(BTCPrice)

  const tokensInDollar = BTCPriceNumber.times(
    new BigNumber(props.amountSatoshi).div(SATOSHI_IN_BTC)
  )
    .toFixed(2)
    .toString()

  const feeInDollar = BTCPriceNumber.times(
    new BigNumber(fee).div(SATOSHI_IN_BTC)
  )
    .toFixed(2)
    .toString()

  const total = new BigNumber(fee).plus(new BigNumber(props.amountSatoshi))

  const totalInDollar = BTCPriceNumber.times(total.div(SATOSHI_IN_BTC))
    .toFixed(2)
    .toString()

  return (
    <div className={styles.section}>
      <Typography className={styles.title}>
        Confirm your Bucket Selection
      </Typography>
      <Typography className={styles.desc}>
        You will not be able to make that adjustment later in the process
      </Typography>

      <div className={styles.bottomInfos}>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Chosen Bucket</Typography>
          <Typography className={styles.rightInfo}>
            {props.selectedBucket} Bucket
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Token Price</Typography>
          <Typography className={styles.rightInfo}>
            {satoshiFormat(props.amountSatoshi)} (${tokensInDollar})
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.leftInfo}>Service Fee</Typography>
          <Typography className={styles.rightInfo}>
            {satoshiFormat(fee)} (${feeInDollar})
          </Typography>
        </div>
        <div className={styles.infoLine} />
        <div className={`${styles.oneInfo} ${styles.summary}`}>
          <Typography className={styles.leftInfo}>Total</Typography>
          <Typography className={styles.rightInfo}>
            {satoshiFormat(total.toString())} (${totalInDollar})
          </Typography>
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <Button
          className={`${styles.btn}`}
          onClick={() => {
            props.setTab(ModalTabs.Bucket)
          }}>
          <Typography>Back</Typography>
        </Button>

        <Button
          className={`${styles.btn} ${styles.rightBtn}`}
          onClick={() => {
            if (!bucketConfirmed) confirmBucket(props.selectedBucket)
            props.setTab(ModalTabs.Payments)
          }}>
          <Typography>Confirm</Typography>
        </Button>
      </div>
    </div>
  )
}
