import React, { createContext, ReactNode, useContext, useState } from 'react'

import { ModalTabs } from '../constants'

export enum ModalType {
  WALLET_CONNECT = 'walletConnect',
  PAYMENT = 'payment',
  WALLET_DISCONNECT = 'walletDisconnect'
}

type ModalContextType = {
  [ModalType.WALLET_CONNECT]: boolean
  [ModalType.PAYMENT]: boolean
  [ModalType.WALLET_DISCONNECT]: boolean
  openModal: (modalName: ModalType, paymentModalTab?: ModalTabs) => void
  closeModal: (modalName: ModalType) => void
  paymentModalTab: ModalTabs
}

export const ModalContext = createContext<ModalContextType>({
  [ModalType.WALLET_CONNECT]: false,
  [ModalType.PAYMENT]: false,
  [ModalType.WALLET_DISCONNECT]: false,
  openModal: () => {
    console.log('Default openModal invoked')
  },
  closeModal: () => {
    console.log('Default closeModal invoked')
  },
  paymentModalTab: ModalTabs.Bucket
})

type ModalContextProviderProps = {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalContextProviderProps) => {
  const [walletConnectModalOpen, setWalletConnectModalOpen] =
    useState<boolean>(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false)
  const [paymentModalTab, setPaymentModalTab] = useState<ModalTabs>(
    ModalTabs.Bucket
  )
  const [walletDisconnectModalOpen, setWalletDisconnectModalOpen] =
    useState<boolean>(false)

  const openModal = (modalName: ModalType, modalTab?: ModalTabs) => {
    if (modalName === ModalType.WALLET_CONNECT) {
      setWalletConnectModalOpen(true)
    } else if (modalName === ModalType.PAYMENT) {
      setPaymentModalOpen(true)
      if (modalTab) setPaymentModalTab(modalTab)
    } else if (modalName === ModalType.WALLET_DISCONNECT) {
      setWalletDisconnectModalOpen(true)
    }
  }

  const closeModal = (modalName: ModalType) => {
    if (modalName === ModalType.WALLET_CONNECT) {
      setWalletConnectModalOpen(false)
    } else if (modalName === ModalType.PAYMENT) {
      setPaymentModalOpen(false)
    } else if (modalName === ModalType.WALLET_DISCONNECT) {
      setWalletDisconnectModalOpen(false)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        [ModalType.WALLET_CONNECT]: walletConnectModalOpen,
        [ModalType.PAYMENT]: paymentModalOpen,
        [ModalType.WALLET_DISCONNECT]: walletDisconnectModalOpen,
        paymentModalTab,
        openModal,
        closeModal
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
