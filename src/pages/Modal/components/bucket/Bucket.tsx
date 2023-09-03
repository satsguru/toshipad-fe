import { Button, Typography } from '@mui/material'
import BigNumber from 'bignumber.js'
import { BucketTypes, ModalTabs } from 'constants/index'
import {
  ProjectContextType,
  ProjectIdoContext,
  useProjectIdo
} from 'contexts/ProjectIdoContext'
import { useContext } from 'react'
import { satoshiFormat, SATOSHI_IN_BTC } from 'utils/SatoshiFormat'

import styles from './Bucket.module.scss'

export const Bucket = (props: {
  selectedBucket: BucketTypes
  setSelectedBucket: any
  setTab: any
  setCloseWindow: any
}) => {
  const projectApiData = useContext(ProjectIdoContext)
  const { bucketConfirmed, fundingStatus } = useProjectIdo()

  const BTCPriceNumber = new BigNumber(projectApiData.BTCPrice)

  const bronzeAllocation = BTCPriceNumber.times(
    new BigNumber(projectApiData[BucketTypes.Bronze]).div(SATOSHI_IN_BTC)
  ).toString()
  const silverAllocation = BTCPriceNumber.times(
    new BigNumber(projectApiData[BucketTypes.Silver]).div(SATOSHI_IN_BTC)
  ).toString()
  const goldAllocation = BTCPriceNumber.times(
    new BigNumber(projectApiData[BucketTypes.Gold]).div(SATOSHI_IN_BTC)
  ).toString()

  const computeClasses = (bucketType: BucketTypes) => {
    if (!projectApiData) {
      return `${styles.onePoint}`
    }

    const reqKey = `${bucketType}Req` as keyof ProjectContextType
    let classes = `${styles.onePoint}`

    if (
      fundingStatus?.bucketSize !== undefined &&
      fundingStatus?.bucketSize !== null
    ) {
      if (fundingStatus.bucketSize === bucketType) {
        classes += ` ${styles.selectedPoint}`
      } else {
        classes += ` ${styles.disabled}`
      }
    } else if (props.selectedBucket === bucketType) {
      classes += ` ${styles.selectedPoint}`
    } else if (
      projectApiData[reqKey] &&
      +projectApiData[reqKey]! > +projectApiData.tokenHoldings
    ) {
      classes += ` ${styles.disabled}`
    }

    return classes
  }

  return (
    <div className={styles.bucket}>
      <Typography className={styles.title}>
        {bucketConfirmed
          ? `Bucket confirmed, no modifications allowed.`
          : `Choose which bucket you want to take`}
      </Typography>
      <div className={styles.points}>
        <div
          className={computeClasses(BucketTypes.Bronze)}
          onClick={() => {
            if (
              !bucketConfirmed &&
              +projectApiData.tokenHoldings >= +projectApiData.BronzeReq
            ) {
              props.setSelectedBucket(BucketTypes.Bronze)
            }
          }}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.names}>
              <Typography className={styles.leftTitle}>Bronze</Typography>
              <Typography className={styles.leftDesc}>
                {+projectApiData.BronzeReq
                  ? `${projectApiData.BronzeReq} CNCL Required, No Guaranteeed Allocation`
                  : 'No Requirements, No Guaranteeed Allocation'}
              </Typography>
            </div>
          </div>
          <div className={styles.right}>
            <Typography className={styles.rightTitle}>{`${satoshiFormat(
              projectApiData[BucketTypes.Bronze]
            )}`}</Typography>
            <Typography className={styles.rightDesc}>{`≈ $${Math.floor(
              +bronzeAllocation
            )} Allocation`}</Typography>
          </div>
        </div>
        <div
          className={computeClasses(BucketTypes.Silver)}
          onClick={() => {
            if (
              !bucketConfirmed &&
              +projectApiData.tokenHoldings >= +projectApiData.SilverReq
            ) {
              props.setSelectedBucket(BucketTypes.Silver)
            }
          }}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.names}>
              <Typography className={styles.leftTitle}>Silver</Typography>
              <Typography
                className={`${styles.leftDesc} ${
                  +projectApiData.tokenHoldings >= +projectApiData.SilverReq
                    ? ''
                    : styles.required
                }`}>
                {+projectApiData.SilverReq
                  ? `${projectApiData.SilverReq} CNCL Required, No Guaranteeed Allocation`
                  : 'No Requirements, No Guaranteeed Allocation'}
              </Typography>
            </div>
          </div>
          <div className={styles.right}>
            <Typography className={styles.rightTitle}>{`${satoshiFormat(
              projectApiData[BucketTypes.Silver]
            )}`}</Typography>
            <Typography className={styles.rightDesc}>{`≈ $${Math.floor(
              +silverAllocation
            )} Allocation`}</Typography>
          </div>
        </div>
        <div
          className={computeClasses(BucketTypes.Gold)}
          onClick={() => {
            if (
              !bucketConfirmed &&
              +projectApiData.tokenHoldings >= +projectApiData.GoldReq
            ) {
              props.setSelectedBucket(BucketTypes.Gold)
            }
          }}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.names}>
              <Typography className={styles.leftTitle}>Gold</Typography>
              <Typography
                className={`${styles.leftDesc} ${
                  +projectApiData.tokenHoldings >= +projectApiData.GoldReq
                    ? ''
                    : styles.required
                }`}>
                {+projectApiData.GoldReq
                  ? `${projectApiData.GoldReq} CNCL Required, No Guaranteeed Allocation`
                  : 'No Requirements, No Guaranteeed Allocation'}
              </Typography>
            </div>
          </div>
          <div className={styles.right}>
            <Typography className={styles.rightTitle}>{`${satoshiFormat(
              projectApiData[BucketTypes.Gold]
            )}`}</Typography>
            <Typography className={styles.rightDesc}>{`≈ $${Math.floor(
              +goldAllocation
            )} Allocation`}</Typography>
          </div>
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <Button
          className={`${styles.btn}`}
          onClick={() => {
            props.setCloseWindow(true)
          }}>
          <Typography>Close</Typography>
        </Button>
        <Button
          className={`${styles.btn} ${styles.rightBtn}`}
          // onClick={() => {
          //   bucketConfirmed
          //     ? props.setTab(ModalTabs.Payments)
          //     : confirmBucket(props.selectedBucket)
          // }}
          onClick={() => {
            props.setTab(ModalTabs.BucketConfirmSelection)
          }}>
          <Typography>{bucketConfirmed ? 'Confirm' : 'Next'}</Typography>
        </Button>
      </div>
    </div>
  )
}
