import axios from 'axios'
import { getAddressUTXOURL } from 'btcConfig'
import { ClaimStatus, FundingStatus } from 'contexts/ProjectIdoContext'

import { API_ENDPOINTS } from './apiEndpoints'
import {
  ClaimRequest,
  ClaimStatusResponse,
  ConfirmBucketRequest,
  RegisterUserRequest,
  RegisterUserResponse
} from './types'

export interface UTXO {
  txid: string
  vout: number
  value: number
}

const BASE_URL = process.env.REACT_APP_API_URL

export const registerUserService = async (
  requestData: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await axios.post<RegisterUserResponse>(
    `${BASE_URL}${API_ENDPOINTS.REGISTER_USER}`,
    requestData
  )

  return response.data
}

export const getDepositAddressService = async (
  withdrawAddress: string
): Promise<any | null> => {
  const url = `${BASE_URL}${API_ENDPOINTS.GET_DEPOSIT_ADDRESS}${withdrawAddress}`

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('An error occurred while fetching the deposit address', error)
    return null
  }
}

export const getUTXOsService = async (address: string): Promise<UTXO[]> => {
  const response = await axios.get(getAddressUTXOURL(address))
  if (response.status !== 200) {
    throw new Error('Failed to fetch UTXOs')
  }

  return response.data
}

export const confirmBucketService = async (
  requestData: ConfirmBucketRequest,
  projectName: string
) => {
  const response = await axios.post<FundingStatus>(
    `${BASE_URL}funding/${projectName}/selectBucket`,
    requestData
  )
  return response.data
}

export const claimTokensService = async (
  requestData: ClaimRequest,
  projectName: string
) => {
  const response = await axios.post<ClaimStatus>(
    `${BASE_URL}funding/${projectName}/claim`,
    requestData
  )
  return response.data
}

export const claimStatusService = async (
  walletAddress: string,
  projectName: string
) => {
  const response = await axios.get<ClaimStatusResponse>(
    `${BASE_URL}funding/claim/${projectName}/${walletAddress}`
  )
  console.log(response.data)
  return response.data
}
