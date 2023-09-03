import { Button, Typography } from '@mui/material'
import { Icons } from 'assets'
import BigNumber from 'bignumber.js'
import { BucketTypes, ModalTabs, PaymentMethod } from 'constants/index'
import { useWallet } from 'contexts'
import { useSendBitcoin } from 'hooks'
import { useEffect } from 'react'

import { useProjectIdo } from '../../../../contexts/ProjectIdoContext'
import {
  satoshiFormat,
  satoshiToBtcFormat,
  SATOSHI_IN_BTC
} from '../../../../utils/SatoshiFormat'

import styles from './Summary.module.scss'

export const Summary = (props: {
  setTab: any
  paymentMethod: PaymentMethod | null
  setTxId: any
  amountSatoshi: string
  selectedBucket: BucketTypes
}) => {
  const { sendBitcoin } = useSendBitcoin()
  const { walletData, registeredUserData, lastTx } = useWallet()
  const { fee, BTCPrice } = useProjectIdo()
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

  useEffect(() => {
    if (lastTx) {
      props.setTab(ModalTabs.TransactionSuccess)
    }
  }, [lastTx, props])

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  //TODO needs to be fixed, once XVERSE send BTC will work on prod
  return (
    <div className={styles.section}>
      <Typography className={styles.title}>
        Send Payment To Our Address
      </Typography>

      <div className={styles.qrInfo}>
        <div className={styles.qrLeft}>
          <div className={styles.texts}>
            <Typography className={styles.qrTitle}>Wallet Address</Typography>
            <Typography className={styles.qrDesc}>
              {registeredUserData!.depositAddress}
            </Typography>
          </div>
        </div>
        <div
          onClick={() => handleCopy(registeredUserData!.depositAddress)}
          className={styles.copy}>
          <img src={Icons.copy} alt="" />
        </div>
      </div>
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
            {satoshiToBtcFormat(total)} (${totalInDollar})
          </Typography>
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <Button
          className={`${styles.btn}`}
          onClick={() => {
            props.setTab(ModalTabs.Payments)
          }}>
          <Typography>Back</Typography>
        </Button>
        {props.paymentMethod === PaymentMethod.ConnectedWallet &&
        walletData!.walletName !== 'Xverse' ? (
          <Button
            className={`${styles.btn} ${styles.rightBtn}`}
            onClick={() => {
              sendBitcoin(total.toString())
            }}>
            <Typography>Pay with {walletData!.walletName}</Typography>
          </Button>
        ) : (
          <Button
            className={`${styles.btn} ${styles.rightBtn}`}
            onClick={() => {
              props.setTab(ModalTabs.TransactionSuccess)
            }}>
            <Typography>Paid</Typography>
          </Button>
        )}
      </div>
    </div>
  )
}
