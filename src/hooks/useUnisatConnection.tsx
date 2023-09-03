import { network } from 'btcConfig'
import { WalletLinks } from 'constants/index'
import { useWallet } from 'contexts'
import { useCallback } from 'react'
import { WalletName } from 'types'

export const useUnisatConnection = () => {
  const { connectWallet } = useWallet()

  const connectUniSatWallet = useCallback(async () => {
    const unisat = (window as any).unisat
    if (unisat) {
      const accounts = await unisat.requestAccounts()
      if (accounts.length > 0) {
        const address = accounts[0]
        const publicKey = await unisat.getPublicKey()

        connectWallet({
          paymentAddress: address.startsWith(
            network === 'Mainnet' ? 'bc1' : 'tb1'
          )
            ? null
            : address,
          paymentPublicKey: address.startsWith(
            network === 'Mainnet' ? 'bc1' : 'tb1'
          )
            ? null
            : publicKey,
          ordinalsAddress: address.startsWith(
            network === 'Mainnet' ? 'bc1' : 'tb1'
          )
            ? address
            : null,
          ordinalsPublicKey: address.startsWith(
            network === 'Mainnet' ? 'bc1' : 'tb1'
          )
            ? publicKey
            : null,
          walletName: WalletName.UniSat
        })
      }
    } else {
      console.log('UniSat is not installed.')
      window.open(WalletLinks.UniSat, '_blank')
    }
  }, [connectWallet])

  return { connectUniSatWallet }
}
