import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import { Icons } from 'assets'
import { ModalType, useModal } from 'contexts'
import {
  useHiroConnection,
  useUnisatConnection,
  useXverseConnection
} from 'hooks'
import { useCallback } from 'react'
import { WalletName } from 'types'

import styles from './WalletConnect.module.scss'

export const WalletConnect = () => {
  const { connectUniSatWallet } = useUnisatConnection()
  const { connectXverseWallet } = useXverseConnection()
  const { connectHiroWallet } = useHiroConnection()
  const { closeModal } = useModal()

  const walletTypes = [
    { name: WalletName.Xverse, icon: Icons.Wallets.wallet_xverse },
    { name: WalletName.UniSat, icon: Icons.Wallets.wallet_unisat },
    { name: WalletName.Hiro, icon: Icons.Wallets.wallet_hiro }
  ]

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      switch (walletName) {
        case WalletName.Xverse:
          connectXverseWallet()
          closeModal(ModalType.WALLET_CONNECT)
          break
        case WalletName.UniSat:
          connectUniSatWallet()
          closeModal(ModalType.WALLET_CONNECT)
          break
        case WalletName.Hiro:
          connectHiroWallet()
          closeModal(ModalType.WALLET_CONNECT)
          break
        default:
          console.log(`No wallet found with the name ${walletName}`)
          break
      }
    },
    [connectXverseWallet, connectUniSatWallet, connectHiroWallet, closeModal]
  )

  return (
    <div className={styles.main}>
      <div className={styles.inside}>
        <div className={styles.top}>
          <Typography className={styles.topTitle}>Connect Wallet</Typography>
          <CloseIcon
            className={styles.close}
            onClick={() => {
              closeModal(ModalType.WALLET_CONNECT)
            }}
          />
        </div>

        <div className={styles.wallets}>
          {walletTypes.map((w, idx) => (
            <div
              key={`w${idx}`}
              className={styles.oneWallet}
              onClick={() => handleWalletClick(w.name)}>
              <div className={styles.left}>
                <div className={styles.icon}>
                  <img src={w.icon} alt={w.name} />
                </div>
                <Typography className={styles.leftTitle}>{w.name}</Typography>
              </div>
              <div className={styles.right}>
                <img src={Icons.arrowForward} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
