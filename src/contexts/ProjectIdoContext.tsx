import axios from 'axios'
import { useSignMessage } from 'hooks'
import { createContext, useContext, useEffect, useState } from 'react'
import { API_ENDPOINTS } from 'services/apiEndpoints'
import { ClaimRequest, ConfirmBucketRequest } from 'services/types'
import {
  claimStatusService,
  claimTokensService,
  confirmBucketService
} from 'services/userService'

import { Icons } from '../assets'
import { getAddressLastTXS } from '../btcConfig'
import { ApiMessages, BucketTypes, Messages } from '../constants'
import { useWallet } from './WalletContext'

export const bucketSizeToBucketTypesMap: Record<string, BucketTypes> = {
  SMALL: BucketTypes.Bronze,
  MEDIUM: BucketTypes.Silver,
  LARGE: BucketTypes.Gold
}

export enum UserFundingStatus {
  NOT_STARTED = 'NOT_STARTED',
  BUCKET_CHOSEN = 'BUCKET_CHOSEN',
  PAID = 'PAID',
  SUCCESS = 'SUCCESS',
  PAID_TOO_LESS = 'PAID_TOO_LESS',
  FAILURE_NO_PAYMENT = 'FAILURE_NO_PAYMENT',
  FAILURE_TOO_LATE = 'FAILURE_TOO_LATE',
  FAILURE_PAID_TOO_LESS = 'FAILURE_PAID_TOO_LESS',
  READY_TO_CLAIM = 'READY_TO_CLAIM',
  CLAIMED = 'CLAIMED'
}

export const UserFundingStatusText: Record<UserFundingStatus, string> = {
  NOT_STARTED: 'You did not take part in this IDO.',
  BUCKET_CHOSEN:
    'We are awaiting your payment. If you completed your payment, do not worry, it can take several BTC blocks to confirm it on our side.',
  PAID: 'Payment confirmed! Your tokens will be ready to claim after IDO finish.',
  SUCCESS: 'Congratulation, you will be able to claim your allocation shortly!',
  PAID_TOO_LESS:
    'We did not receive enough fund to qualify You for this IDO. Please fulfill your payment.',
  FAILURE_NO_PAYMENT: 'You failed to send us funds for this IDO.',
  FAILURE_TOO_LATE:
    'Unfortunately your payment was too late to get qualified. We will return it after IDO finish.',
  FAILURE_PAID_TOO_LESS:
    'Unfortunately your payment was not enough to get qualified. We will return it after IDO finish.',
  READY_TO_CLAIM:
    'Congratulation! Your tokens and any overpayment is ready to be claimed now.',
  CLAIMED: 'Congratulation! You claimed your tokens.'
}

export const UserFundingStatusIcon: Record<UserFundingStatus, any> = {
  NOT_STARTED: '',
  BUCKET_CHOSEN: Icons.info,
  PAID: Icons.greenCheck,
  SUCCESS: Icons.success,
  READY_TO_CLAIM: Icons.greenCheck,
  CLAIMED: Icons.success,
  PAID_TOO_LESS: Icons.sadFace,
  FAILURE_NO_PAYMENT: Icons.sadFace,
  FAILURE_TOO_LATE: Icons.sadFace,
  FAILURE_PAID_TOO_LESS: Icons.sadFace
}

export interface FundingStatus {
  deposit: string
  overDeposit: string
  approvedDeposit: string
  txs: string[]
  bucketSize: BucketTypes
  status: UserFundingStatus
}

export interface ClaimStatus {
  brcTxId: string
  btcTxId: string
}

export interface ProjectContextType {
  participants: string
  totalRaised: string
  raiseGoal: string
  [BucketTypes.Bronze]: string
  [BucketTypes.Silver]: string
  [BucketTypes.Gold]: string
  BronzeReq: string
  SilverReq: string
  GoldReq: string
  BTCPrice: string
  tokenHoldings: string
  tokenPrice: string
  fee: string
  ticker: string
  confirmBucket: (bucketType: BucketTypes) => void
  claimTokens: () => void
  bucketConfirmed: boolean
  fundingStatus: FundingStatus | null
  claimStatus: ClaimStatus | null
}

export const ProjectIdoContext = createContext<ProjectContextType>({
  participants: '0',
  totalRaised: '0',
  raiseGoal: '0',
  [BucketTypes.Bronze]: '0',
  [BucketTypes.Silver]: '0',
  [BucketTypes.Gold]: '0',
  BronzeReq: '0',
  SilverReq: '0',
  GoldReq: '0',
  BTCPrice: '0',
  tokenHoldings: '0',
  tokenPrice: '0',
  fee: '0',
  ticker: '',
  confirmBucket: (bucketType: BucketTypes) => {
    console.log('Default confirmBucker invoked ', bucketType)
  },
  claimTokens: () => {
    console.log('Default claimTokens invoked ')
  },
  bucketConfirmed: false,
  fundingStatus: null,
  claimStatus: null
})

export const ProjectIdoProvider = ({ children, project }: any) => {
  const [participants, setParticipants] = useState(project.participants)
  const [totalRaised, setTotalRaised] = useState(project.totalRaised)
  const [raiseGoal, setRaiseGoal] = useState(project.raiseGoal)
  const [tokenPrice, setTokenPrice] = useState(project.tokenPrice)
  const [fee, setFee] = useState('1000')
  const [ticker] = useState(project.tokenTicker)
  const [Bronze, setBronze] = useState('0')
  const [Silver, setSilver] = useState('0')
  const [Gold, setGold] = useState('0')
  const [BronzeReq, setBronzeReq] = useState('0')
  const [SilverReq, setSilverReq] = useState('3')
  const [GoldReq, setGoldReq] = useState('15')
  const [BTCPrice, setBTCPrice] = useState('30630')
  const [tokenHoldings, setTokenHoldings] = useState('0')
  const [bucketConfirmed, setBucketConfirmed] = useState(false)
  const [fundingStatus, setFundingStatus] = useState<FundingStatus | null>(null)
  const [claimStatus, setClaimStatus] = useState<ClaimStatus | null>(null)
  const { signMessage } = useSignMessage()

  const { walletData, registeredUserData, lastTx, setLastTx } = useWallet()

  const selectBucketMessage = (
    bucketType: BucketTypes
  ): { wallet: string; api: string } => {
    switch (bucketType) {
      case BucketTypes.Bronze:
        return {
          wallet: Messages.SELECT_SMALL_BUCKET,
          api: ApiMessages.SELECT_SMALL_BUCKET
        }
      case BucketTypes.Silver:
        return {
          wallet: Messages.SELECT_MEDIUM_BUCKET,
          api: ApiMessages.SELECT_MEDIUM_BUCKET
        }
      case BucketTypes.Gold:
        return {
          wallet: Messages.SELECT_LARGE_BUCKET,
          api: ApiMessages.SELECT_LARGE_BUCKET
        }
      default:
        throw new Error(`Invalid BucketType: ${bucketType}`)
    }
  }

  const confirmBucket = async (bucketType: BucketTypes) => {
    const bucketMsg = selectBucketMessage(bucketType)
    const signature = await signMessage(bucketMsg.wallet)
    if (signature && walletData) {
      const requestBody: ConfirmBucketRequest = {
        public: walletData.ordinalsPublicKey || '',
        msg: bucketMsg.api,
        sign: signature
      }
      const result = await confirmBucketService(requestBody, project.id)
      if (result) {
        const serverBucketSize = result.bucketSize
        const fStatus = {
          ...result,
          bucketSize:
            bucketSizeToBucketTypesMap[
              serverBucketSize as keyof typeof bucketSizeToBucketTypesMap
            ]
        }
        setBucketConfirmed(true)
        setFundingStatus(fStatus)
      }
    }
  }

  const claimTokens = async () => {
    const msg = {
      wallet: Messages.CLAIM,
      api: ApiMessages.CLAIM
    }
    const signature = await signMessage(msg.wallet)
    if (signature && walletData) {
      const requestBody: ClaimRequest = {
        public: walletData.ordinalsPublicKey || '',
        msg: msg.api,
        sign: signature
      }
      const result = await claimTokensService(requestBody, project.id)
      if (result) {
        setClaimStatus(result)
      }
    }
  }

  useEffect(() => {
    const checkFundingStatus = async () => {
      if (walletData && walletData.ordinalsAddress && registeredUserData) {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_ENDPOINTS.GET_FUNDING_STATUS}${project.id}/${walletData.ordinalsAddress}`
          )
          const serverBucketSize = data.bucketSize
          const fStatus = {
            ...data,
            bucketSize:
              bucketSizeToBucketTypesMap[
                serverBucketSize as keyof typeof bucketSizeToBucketTypesMap
              ]
          }
          setFundingStatus(fStatus)
          setBucketConfirmed(data.status !== UserFundingStatus.NOT_STARTED)
        } catch (e) {
          console.error(e)
        }
      } else {
        setFundingStatus(null)
        setBucketConfirmed(false)
      }
    }
    checkFundingStatus()
  }, [walletData, project, registeredUserData])

  useEffect(() => {
    const getIdoData = async () => {
      const getBTCPrice = async () => {
        if (
          localStorage.getItem('BTCPrice') &&
          Number(localStorage.getItem('BTCPriceDate')) + 10000 > Date.now()
        ) {
          return localStorage.getItem('BTCPrice')
        }
        const {
          data: {
            bitcoin: { usd }
          }
        } = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
        )
        localStorage.setItem('BTCPrice', usd)
        localStorage.setItem('BTCPriceDate', `${Date.now()}`)
        return usd
      }

      const getFundingDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}funding/getFundingDetails/${project.id}`
        )
        return data
      }

      const getUserDetails = async () => {
        if (walletData && walletData.ordinalsAddress) {
          try {
            const {
              data: { overallBalance }
            } = await axios.get(
              `${process.env.REACT_APP_API_URL}user/cncl/${walletData.ordinalsAddress}`
            )
            return overallBalance
          } catch (e) {
            return '0'
          }
        }

        return '0'
      }

      const fundingData = await getFundingDetails()
      const price = await getBTCPrice()
      const userTokenHoldings = await getUserDetails()
      setParticipants(fundingData.contributors)
      setTotalRaised(fundingData.collectedFunds)
      setRaiseGoal(fundingData.hardCap)
      setTokenPrice(fundingData.tokenPrice)
      setFee(fundingData.fee)
      setBronze(fundingData.smallBucket)
      setSilver(fundingData.mediumBucket)
      setGold(fundingData.largeBucket)
      setBronzeReq(fundingData.smallReq)
      setSilverReq(fundingData.mediumReq)
      setGoldReq(fundingData.largeReq)
      setBTCPrice(`${price}`)
      setTokenHoldings(userTokenHoldings || '0')
    }

    const idoRefreshInterval = setInterval(getIdoData, 120000)
    getIdoData()
    return () => {
      clearInterval(idoRefreshInterval)
    }
  }, [project, walletData])

  useEffect(() => {
    const getTxs = async () => {
      const { data } = await axios.get(
        getAddressLastTXS(registeredUserData!.depositAddress)
      )
      if (data[0]) {
        setLastTx(data[0].txid)
      }
    }

    if (registeredUserData?.depositAddress) {
      getTxs()
    }
  }, [lastTx, registeredUserData, walletData, project.id, setLastTx])

  useEffect(() => {
    const getClaimStatus = async () => {
      if (
        fundingStatus?.status &&
        fundingStatus?.status === UserFundingStatus.CLAIMED &&
        walletData?.ordinalsAddress
      ) {
        const res = await claimStatusService(
          walletData.ordinalsAddress!,
          project.id
        )
        if (res.withdrawBrcTx) {
          setClaimStatus({
            brcTxId: res.withdrawBrcTx,
            btcTxId: res.withdrawBtcTx
          })
        }
      }
    }
    getClaimStatus()
  }, [walletData, fundingStatus, project.id])

  return (
    <ProjectIdoContext.Provider
      value={{
        participants,
        totalRaised,
        raiseGoal,
        Bronze,
        Silver,
        Gold,
        BronzeReq,
        SilverReq,
        GoldReq,
        BTCPrice,
        tokenHoldings,
        tokenPrice,
        fee,
        ticker,
        confirmBucket,
        fundingStatus,
        bucketConfirmed,
        claimTokens,
        claimStatus
      }}>
      {children}
    </ProjectIdoContext.Provider>
  )
}

export const useProjectIdo = () => useContext(ProjectIdoContext)
