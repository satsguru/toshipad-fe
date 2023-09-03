import { Button, Typography } from '@mui/material'
import BigNumber from 'bignumber.js'
import { Timer } from 'components'
import { ModalType, useModal, useWallet } from 'contexts'
import {
  ProjectIdoContext,
  UserFundingStatus,
  UserFundingStatusIcon,
  UserFundingStatusText
} from 'contexts/ProjectIdoContext'
import { useContext, useMemo } from 'react'
import { satoshiFormat, SATOSHI_IN_BTC } from 'utils/SatoshiFormat'

import { Icons } from '../../../../assets'
import { Anchor } from '../../../../components/Anchor'
import { BucketTypes, ModalTabs } from '../../../../constants'

import styles from './RightTab.module.scss'

export const RightTab = ({ project }: any) => {
  const { openModal } = useModal()
  const { lastTx, walletData, ready } = useWallet()
  const {
    totalRaised,
    raiseGoal,
    participants,
    fundingStatus,
    fee,
    bucketConfirmed,
    BTCPrice,
    Gold,
    Silver,
    Bronze,
    claimStatus,
    claimTokens
  } = useContext(ProjectIdoContext)

  const BTCPriceNumber = new BigNumber(BTCPrice)
  const bucketValues = {
    [BucketTypes.Bronze]: Bronze,
    [BucketTypes.Silver]: Silver,
    [BucketTypes.Gold]: Gold
  }

  const bucket: BucketTypes | null = fundingStatus?.bucketSize
    ? fundingStatus.bucketSize
    : null

  const amountSatoshi = bucket ? bucketValues[bucket] : '0'
  const tokensInDollar = BTCPriceNumber.times(
    new BigNumber(amountSatoshi).div(SATOSHI_IN_BTC)
  )
    .toFixed(2)
    .toString()

  const receivedSatoshi = fundingStatus ? fundingStatus.approvedDeposit : '0'
  const receivedInDollar = BTCPriceNumber.times(
    new BigNumber(receivedSatoshi).div(SATOSHI_IN_BTC)
  )
    .toFixed(2)
    .toString()

  const total = new BigNumber(fee).plus(new BigNumber(amountSatoshi))

  const totalInDollar = BTCPriceNumber.times(total.div(SATOSHI_IN_BTC))
    .toFixed(2)
    .toString()

  const dateToCount = project.isLive()
    ? project.registrationEndDateTime
    : project.isUpcoming()
    ? project.registrationStartDateTime
    : ''

  const renderButton = useMemo(() => {
    if (!walletData) {
      if (ready) {
        return (
          <Button
            className={styles.bottomBtn}
            onClick={() => openModal(ModalType.WALLET_CONNECT)}>
            <Typography>Connect wallet</Typography>
          </Button>
        )
      }
      return null
    }

    if (!project.isLive() && !project.isCompleted()) {
      return null
    }

    switch (fundingStatus?.status) {
      case UserFundingStatus.BUCKET_CHOSEN:
        return (
          <Button
            className={styles.bottomBtn}
            onClick={() => openModal(ModalType.PAYMENT, ModalTabs.Payments)}>
            <Typography>Complete Payment</Typography>
          </Button>
        )
      case UserFundingStatus.NOT_STARTED:
        return (
          <Button
            className={styles.bottomBtn}
            onClick={() => openModal(ModalType.PAYMENT)}>
            <Typography>Choose Bucket</Typography>
          </Button>
        )
      case UserFundingStatus.READY_TO_CLAIM:
        return (
          <Button className={styles.bottomBtn} onClick={claimTokens}>
            <Typography>Claim</Typography>
          </Button>
        )
      default:
        return null
    }
  }, [walletData, project, fundingStatus, ready, openModal, claimTokens])

  return (
    <div className={styles.rightTab}>
      <div className={styles.topInfos}>
        <div className={styles.topLeft}>
          <Typography className={styles.title}>{project.name}</Typography>
          <Typography className={styles.desc}>{project.tokenTicker}</Typography>
        </div>
        <Typography className={styles.topRight} data-value={project.status()}>
          {project.status()}
        </Typography>
      </div>
      {(project.isLive() || project.isUpcoming()) && (
        <div className={styles.timer}>
          <Timer isoTime={dateToCount} timerStatus={project.timerStatus()} />
        </div>
      )}
      <div className={styles.progress}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Typography className={styles.progressTitle}>Progress </Typography>
          </div>
          <div className={styles.right}>
            <Typography className={styles.progressTitle}>
              {+totalRaised / +raiseGoal
                ? Number(+totalRaised / +raiseGoal)
                    .toFixed(3)
                    .toString()
                    .replace(/\.?0+$/, '')
                : 0}
              %
            </Typography>
          </div>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.inside}
            style={{
              width: `${+totalRaised / +raiseGoal}%`
            }}
          />
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.oneInfo}>
          <Typography className={styles.left}>IDO Price</Typography>
          <Typography className={styles.right}>
            {project.tokenPrice
              ? `1 ${project.tokenTicker} = ${satoshiFormat(
                  project.tokenPrice
                )}`
              : 'TBA'}
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.left}>Goal</Typography>
          <Typography className={styles.right}>
            {satoshiFormat(raiseGoal)}
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.left}>Raised</Typography>
          <Typography className={styles.right}>
            {satoshiFormat(totalRaised)}
          </Typography>
        </div>
        <div className={styles.oneInfo}>
          <Typography className={styles.left}>Total Investors</Typography>
          <Typography className={styles.right}>{participants}</Typography>
        </div>
      </div>
      {bucketConfirmed && fundingStatus && (
        <>
          <div className={styles.infos}>
            <div className={styles.status}>
              {fundingStatus && (
                <Typography className={styles.secondaryTitle}>
                  Your Payment Data
                </Typography>
              )}
            </div>
            <div className={styles.oneInfo}>
              <Typography className={styles.left}>Your Bucket</Typography>
              <Typography className={styles.right}>
                {bucket} Bucket (${tokensInDollar})
              </Typography>
            </div>
            <div className={styles.oneInfo}>
              <Typography className={styles.left}>Total Payment</Typography>
              <Typography className={styles.right}>
                {satoshiFormat(total.toString())} (${totalInDollar})
              </Typography>
            </div>
            {fundingStatus && (
              <div className={styles.oneInfo}>
                <Typography className={styles.left}>
                  Payment Received
                </Typography>
                <Typography className={styles.right}>
                  {satoshiFormat(fundingStatus.approvedDeposit)} ($
                  {receivedInDollar})
                </Typography>
              </div>
            )}
            {lastTx && (
              <div className={styles.oneInfo}>
                <Typography className={styles.left}>
                  Last deposit transaction
                </Typography>
                <Typography className={styles.right}>
                  <Anchor link={`https://mempool.space/tx/${lastTx}`}>
                    {`${lastTx.slice(0, 5)}...${lastTx.slice(-5)}`}
                  </Anchor>
                </Typography>
              </div>
            )}
          </div>
          {claimStatus?.brcTxId && (
            <div className={styles.infos}>
              <div className={styles.status}>
                {fundingStatus && (
                  <Typography className={styles.secondaryTitle}>
                    Your Claim Data
                  </Typography>
                )}
              </div>

              <div className={styles.oneInfo}>
                <Typography className={styles.left}>
                  Claim BRC-20 transaction
                </Typography>
                <Typography className={styles.right}>
                  <Anchor
                    link={`https://mempool.space/tx/${claimStatus.brcTxId}`}>
                    {`${claimStatus.brcTxId.slice(
                      0,
                      5
                    )}...${claimStatus.brcTxId.slice(-5)}`}
                  </Anchor>
                </Typography>
              </div>
              {claimStatus?.btcTxId && (
                <div className={styles.oneInfo}>
                  <Typography className={styles.left}>
                    Claim overpayment transaction
                  </Typography>
                  <Typography className={styles.right}>
                    <Anchor
                      link={`https://mempool.space/tx/${claimStatus.btcTxId}`}>
                      {`${claimStatus.btcTxId.slice(
                        0,
                        5
                      )}...${claimStatus.btcTxId.slice(-5)}`}
                    </Anchor>
                  </Typography>
                </div>
              )}
            </div>
          )}
          <div className={styles.paymentInfo}>
            <img
              className={styles.paymentIcons}
              src={UserFundingStatusIcon[fundingStatus.status]}
              alt=""
            />
            <Typography className={styles.left}>
              {UserFundingStatusText[fundingStatus.status]}
            </Typography>
          </div>
          {+fundingStatus.overDeposit > 0 && (
            <div className={styles.paymentInfo}>
              <img className={styles.paymentIcons} src={Icons.info} alt="" />
              <Typography className={styles.left}>
                We have acknowledged your overpayment for the Launchpad
                participation. Please be assured that we will initiate a prompt
                refund to return the excess amount paid.
              </Typography>
            </div>
          )}
        </>
      )}
      {renderButton}
    </div>
  )
}
