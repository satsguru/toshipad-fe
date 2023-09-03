import { Button, Typography } from '@mui/material'
import { Icons } from 'assets'
import { ModalTabs } from 'constants/index'
import { ModalType, useModal, useWallet } from 'contexts'

import { Anchor } from 'components/Anchor'

import styles from './Success.module.scss'

export const Success = (props: { setTab: any; txId: string }) => {
  const { closeModal } = useModal()
  const { lastTx, setLastTx } = useWallet()
  return (
    <div className={styles.section}>
      <div className={styles.icon}>
        <img src={Icons.check} alt="" />
      </div>
      <Typography className={styles.title}>Success!</Typography>
      {lastTx && (
        <Typography className={styles.desc}>
          Transaction ID:{' '}
          <Anchor link={`https://mempool.space/tx/${lastTx}`}>
            {`${lastTx.slice(0, 5)}...${lastTx.slice(-5)}`}
          </Anchor>
          .
        </Typography>
      )}
      <Typography className={styles.desc}>
        Your application has been processed successfully! We are now awaiting
        confirmations from the Bitcoin network. Allocations will be on a
        'First-Come-First-Serve' basis. In case of overallocation, a refund is
        guaranteed. Your patience is appreciated during this time.
      </Typography>

      <div className={styles.bottomButtons}>
        <Button
          className={`${styles.btn} ${styles.rightBtn}`}
          onClick={() => {
            closeModal(ModalType.PAYMENT)
            setLastTx('')
            props.setTab(ModalTabs.Bucket)
          }}>
          <Typography>Done</Typography>
        </Button>
      </div>
    </div>
  )
}
