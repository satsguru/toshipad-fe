import { useWallet } from 'contexts'
import { getAddress } from 'sats-connect'
import { WalletName } from 'types'
import { network } from 'btcConfig'
import {WalletLinks} from 'constants/index'

export const useXverseConnection = () => {
  const { connectWallet } = useWallet()

  const connectXverseWallet = async () => {
    const getAddressOptions = {
      payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address for receiving Ordinals',
        network: {
          type: network
        }
      },
      onFinish: response => {
        connectWallet({
          paymentAddress: response.addresses[1].address,
          paymentPublicKey: response.addresses[1].publicKey,
          ordinalsAddress: response.addresses[0].address,
          ordinalsPublicKey: response.addresses[0].publicKey,
          walletName: WalletName.Xverse
        })
      },
      onCancel: () => console.log('Request canceled')
    }
    await getAddress(getAddressOptions).catch(() =>
      {
        window.open(WalletLinks.Xverse, '_blank')
        console.log('Xverse is not installed.')
      }

    )
  }

  return { connectXverseWallet }
}
