import { Button, Typography } from '@mui/material'
import { Icons } from 'assets'
import { ModalTabs, PaymentMethod } from 'constants/index'

import styles from './Payment.module.scss'

export const Payment = (props: { setPaymentMethod: any; setTab: any }) => (
  <div className={styles.section}>
    <Typography className={styles.title}>Choose payment method</Typography>
    <div className={styles.points}>
      <div
        className={styles.onePoint}
        onClick={() => {
          props.setPaymentMethod(PaymentMethod.ConnectedWallet)
          props.setTab(ModalTabs.TransactionSummary)
        }}>
        <div className={styles.left}>
          <div className={styles.icon}>
            <img src={Icons.Wallets.wallet_connected} alt="" />
          </div>
          <div className={styles.names}>
            <Typography className={`${styles.leftTitle} ${styles.noDesc}`}>
              Connected Wallet
            </Typography>
          </div>
        </div>
        <div className={styles.right}>
          <img src={Icons.arrowForward} alt="" />
        </div>
      </div>
      <div
        className={styles.onePoint}
        onClick={() => {
          props.setPaymentMethod(PaymentMethod.ExternalWallet)
          props.setTab(ModalTabs.TransactionSummary)
        }}>
        <div className={styles.left}>
          <div className={styles.icon}>
            <img src={Icons.Wallets.wallet_external} alt="" />
          </div>
          <div className={styles.names}>
            <Typography className={styles.leftTitle}>
              External Wallet
            </Typography>
            <Typography className={styles.leftDesc}>
              Exchange Wallets etc.
            </Typography>
          </div>
        </div>
        <div className={styles.right}>
          <img src={Icons.arrowForward} alt="" />
        </div>
      </div>
      {/*<div*/}
      {/*  className={styles.onePoint}*/}
      {/*  onClick={() => {*/}
      {/*    props.setPaymentMethod(PaymentMethod.QRCode)*/}
      {/*    props.setTab(ModalTabs.TransactionSummary)*/}
      {/*  }}>*/}
      {/*  <div className={styles.left}>*/}
      {/*    <div className={styles.icon}>*/}
      {/*      <img src={Icons.Wallets.wallet_qrcode} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className={styles.names}>*/}
      {/*      <Typography className={`${styles.leftTitle} ${styles.noDesc}`}>*/}
      {/*        QR Code*/}
      {/*      </Typography>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.right}>*/}
      {/*    <img src={Icons.arrowForward} alt="" />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
    <div className={styles.bottomButtons}>
      <Button
        className={`${styles.btn}`}
        onClick={() => {
          props.setTab(ModalTabs.BucketConfirmSelection)
        }}>
        <Typography>Back</Typography>
      </Button>
    </div>
  </div>
)
