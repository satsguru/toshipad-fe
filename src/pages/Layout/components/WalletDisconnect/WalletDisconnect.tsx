import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import { Icons } from 'assets'
import { ModalType, useModal, useWallet } from 'contexts'

import styles from '../WalletConnect/WalletConnect.module.scss'

export const WalletDisconnect = () => {
  const { disconnectWallet } = useWallet()
  const { closeModal } = useModal()

  return (
    <div className={styles.main}>
      <div className={styles.inside}>
        <div className={styles.top}>
          <Typography className={styles.topTitle}>Disconnect wallet</Typography>
          <CloseIcon
            className={styles.close}
            onClick={() => {
              closeModal(ModalType.WALLET_DISCONNECT)
            }}
          />
        </div>

        <div className={styles.wallets}>
          <div
            className={styles.oneWallet}
            onClick={() => {
              disconnectWallet()
              closeModal(ModalType.WALLET_DISCONNECT)
            }}>
            <div className={styles.left}>
              <Typography className={styles.leftTitle}>
                Yes, I want to disconnect wallet
              </Typography>
            </div>
            <div className={styles.right}>
              <img src={Icons.arrowForward} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
