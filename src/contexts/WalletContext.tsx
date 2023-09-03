import { ApiMessages, Messages } from 'constants/index'
import { useSignMessage } from 'hooks'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { RegisterUserRequest } from 'services/types'
import {
  getDepositAddressService,
  registerUserService
} from 'services/userService'

export interface WalletData {
  paymentAddress: string | null
  paymentPublicKey: string | null
  ordinalsAddress: string | null
  ordinalsPublicKey: string | null
  walletName: string
}

interface RegisteredUserData {
  withdrawAddress: string
  depositAddress: string
}

interface WalletContextType {
  walletData: WalletData | null
  connectWallet: (data: WalletData | null) => void
  disconnectWallet: () => void
  registeredUserData: RegisteredUserData | null
  lastTx: string
  ready: boolean
  setLastTx: (tx: string) => void
}

export const WalletContext = createContext<WalletContextType>({
  walletData: null,
  connectWallet: (data: WalletData | null) => {
    console.log(`Default connectWallet invoked with ${data}`)
  },
  disconnectWallet: () => {
    console.log('Default disconnectWallet invoked')
  },
  registeredUserData: null,
  lastTx: '',
  ready: false,
  setLastTx: (tx: string) => {
    console.log(`Default setLastTx invoked with ${tx}`)
  }
})

export const WalletProvider: React.FC = ({ children }) => {
  const walletDataRef = useRef<WalletData | null>(null)
  const { signMessage } = useSignMessage(walletDataRef)
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [lastTx, setLastTx] = useState<string>('')
  const [ready, setReady] = useState<boolean>(false)
  const [registeredUserData, setRegisteredUserData] =
    useState<RegisteredUserData | null>(null)

  useEffect(() => {
    walletDataRef.current = walletData
  }, [walletData])

  const connectWallet = (data: WalletData) => setWalletData(data)

  const disconnectWallet = () => {
    localStorage.removeItem('connected-wallet')
    localStorage.removeItem('registered-user')
    setRegisteredUserData(null)
    return setWalletData(null)
  }

  useEffect(() => {
    const localWallet = localStorage.getItem('connected-wallet')
    if (localWallet) {
      setWalletData(JSON.parse(localWallet))
    }
    setReady(true)
  }, [])

  // register user
  useEffect(() => {
    const handleRegistration = async () => {
      if (walletData && walletData.ordinalsAddress && !registeredUserData) {
        // first check if not registered already
        const savedRegisteredUserData: RegisteredUserData | null =
          await getDepositAddressService(walletData.ordinalsAddress)
        // if not registered, register the user, if registered check funding status
        if (savedRegisteredUserData) {
          setRegisteredUserData(savedRegisteredUserData)
        } else {
          const signature = await signMessage(Messages.REGISTER)
          if (signature) {
            const requestBody: RegisterUserRequest = {
              public: walletData.ordinalsPublicKey || '',
              address: walletData.ordinalsAddress || '',
              msg: ApiMessages.REGISTER,
              sign: signature,
              walletType: walletData.walletName.toLowerCase() || ''
            }
            const result: RegisteredUserData = await registerUserService(
              requestBody
            )
            setRegisteredUserData(result)
          } else {
            // if registration canceled or failed, disconnect wallet
            disconnectWallet()
          }
        }
      }
    }
    handleRegistration()
  }, [walletData, registeredUserData, signMessage])

  useEffect(() => {
    const localUser = localStorage.getItem('registered-user')
    if (localUser) {
      setRegisteredUserData(JSON.parse(localUser))
    }
  }, [])

  useEffect(() => {
    if (walletData) {
      localStorage.setItem('connected-wallet', JSON.stringify(walletData))
    }
  }, [walletData])

  useEffect(() => {
    if (registeredUserData) {
      localStorage.setItem(
        'registered-user',
        JSON.stringify(registeredUserData)
      )
    }
  }, [registeredUserData])

  return (
    <WalletContext.Provider
      value={{
        walletData,
        connectWallet,
        disconnectWallet,
        registeredUserData,
        lastTx,
        setLastTx,
        ready
      }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
