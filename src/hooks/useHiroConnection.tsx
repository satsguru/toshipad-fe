import { WalletLinks } from 'constants/index'
import { useWallet } from 'contexts'
import { WalletName } from 'types'

export const useHiroConnection = () => {
  const { connectWallet } = useWallet()

  const connectHiroWallet = async () => {
    const hiro = (window as any).btc
    if (hiro) {
      const accounts = await hiro.request('getAddresses')
      if (accounts.result.addresses.length > 0) {
        const paymentAccount = accounts.result.addresses.find(
          (address: any) => address.type === 'p2wpkh'
        )
        const ordinalsAccount = accounts.result.addresses.find(
          (address: any) => address.type === 'p2tr'
        )

        connectWallet({
          paymentAddress: paymentAccount.address,
          paymentPublicKey: paymentAccount.publicKey,
          ordinalsAddress: ordinalsAccount.address,
          ordinalsPublicKey: ordinalsAccount.publicKey,
          walletName: WalletName.Hiro
        })
      }
    } else {
      console.log('Hiro is not installed.')
      window.open(WalletLinks.Hiro, '_blank')
    }
  }

  return { connectHiroWallet }
}
