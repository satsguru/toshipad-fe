import CloseIcon from '@mui/icons-material/Close'
import { BucketTypes, ModalTabs, PaymentMethod } from 'constants/index'
import { ModalType, useModal } from 'contexts'
import { useProjectIdo } from 'contexts/ProjectIdoContext'
import { useEffect, useState } from 'react'

import {
  Bucket,
  CloseWindow,
  Left,
  Payment,
  Success,
  Summary
} from './components'
import { BucketConfirmation } from './components/bucketConfirmation'

import styles from './modal.module.scss'

const tabsToArrayWithStep = (tabs: typeof ModalTabs) => {
  const arr = Object.values(tabs) as ModalTabs[]
  const result = arr.map((tab, index) => ({
    step: index + 1,
    tab
  }))
  return result
}

export const Modal = () => {
  const [closeWindow, setCloseWindow] = useState<boolean>(false)
  const {
    [ModalType.PAYMENT]: paymentModalOpen,
    paymentModalTab,
    closeModal
  } = useModal()
  const [tab, setRealTab] = useState<ModalTabs>(
    paymentModalTab || ModalTabs.Bucket
  )
  const [txId, setTxId] = useState('')
  const tabsWithSteps = tabsToArrayWithStep(ModalTabs)
  const [selectedBucket, setSelectedBucket] = useState<BucketTypes>(
    BucketTypes.Bronze
  )
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [amountSatoshi, setAmountSatoshi] = useState<string>('')
  const { Gold, Silver, Bronze, fundingStatus } = useProjectIdo()

  useEffect(() => {
    if (paymentModalTab) {
      setTab(paymentModalTab)
    }
  }, [paymentModalTab])

  useEffect(() => {
    if (closeWindow && tab === ModalTabs.TransactionSuccess) {
      closeModal(ModalType.PAYMENT)
    }
    if (paymentModalTab) {
      setTab(paymentModalTab)
    }
    // eslint-disable-next-line
  }, [closeWindow, paymentModalTab, closeModal])

  useEffect(() => {
    const bucketValues = {
      [BucketTypes.Bronze]: Bronze,
      [BucketTypes.Silver]: Silver,
      [BucketTypes.Gold]: Gold
    }
    setAmountSatoshi(bucketValues[selectedBucket])
  }, [paymentMethod, selectedBucket, Gold, Silver, Bronze, fundingStatus])

  const setTab = (name: ModalTabs) => {
    setRealTab(name)
  }

  const resetModal = () => {
    setRealTab(ModalTabs.Bucket)
    setPaymentMethod(null)
    setSelectedBucket(
      fundingStatus?.bucketSize ? fundingStatus?.bucketSize : BucketTypes.Bronze
    )
  }

  useEffect(() => {
    if (fundingStatus?.bucketSize) {
      setSelectedBucket(fundingStatus.bucketSize)
    }
  }, [fundingStatus])

  if (!paymentModalOpen) {
    return null
  }

  return (
    <div className={styles.main}>
      {closeWindow === true ? (
        <CloseWindow setCloseWindow={setCloseWindow} resetTab={resetModal} />
      ) : (
        false
      )}
      <div className={styles.inside}>
        <Left tab={tab} tabs={tabsWithSteps} />
        <div className={styles.right}>
          <div className={styles.top}>
            <CloseIcon
              className={styles.close}
              onClick={() => {
                setCloseWindow(true)
              }}
            />
          </div>
          {tab === ModalTabs.Bucket ? (
            <Bucket
              selectedBucket={selectedBucket}
              setSelectedBucket={setSelectedBucket}
              setCloseWindow={setCloseWindow}
              setTab={setTab}
            />
          ) : (
            false
          )}

          {tab === ModalTabs.BucketConfirmSelection ? (
            <BucketConfirmation
              setTab={setTab}
              amountSatoshi={amountSatoshi}
              selectedBucket={selectedBucket}
            />
          ) : (
            false
          )}

          {tab === ModalTabs.Payments ? (
            <Payment setPaymentMethod={setPaymentMethod} setTab={setTab} />
          ) : (
            false
          )}

          {tab === ModalTabs.TransactionSummary ? (
            <Summary
              setTab={setTab}
              paymentMethod={paymentMethod}
              setTxId={setTxId}
              amountSatoshi={amountSatoshi}
              selectedBucket={selectedBucket}
            />
          ) : (
            false
          )}
          {/* no waiting for confirmations in POC  */}
          {/* {tab === ModalTabs.WaitingForPayment ? (
            <Confirmations setTab={setTab} />
          ) : (
            false
          )} */}
          {tab === ModalTabs.TransactionSuccess ? (
            <Success setTab={setTab} txId={txId} />
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  )
}
