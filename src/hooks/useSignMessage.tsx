import { network } from 'btcConfig'
import { useWallet, WalletData } from 'contexts'
import { RefObject } from 'react'
import {
  signMessage as signXverseMessage,
  SignMessageOptions
} from 'sats-connect'
import { WalletName } from 'types'

export const useSignMessage = (
  walletDataRef?: RefObject<WalletData | null>
) => {
  const { walletData } = useWallet()
  const signMessage = async (msg: string) => {
    let signature: string = ''
    const wallet = walletDataRef?.current || walletData
    if (wallet?.walletName === WalletName.Hiro) {
      const hiro = (window as any).btc
      if (hiro) {
        const response = await hiro
          .request('signMessage', {
            message: msg,
            paymentType: 'p2tr' // or 'p2wphk' (default)
          })
          .catch((e: any) =>
            console.log(`Error while signing message with Hiro: ${e.msg}`)
          )
        if (response) {
          signature = response.result.signature
        } else {
          console.log('Registration canceled')
        }
      }
    }

    if (wallet?.walletName === WalletName.UniSat) {
      const unisat = (window as any).unisat
      if (unisat) {
        const sig = await unisat
          .signMessage(msg)
          .catch((e: any) =>
            console.log(`Error while signing message with UniSat: ${e}`)
          )
        if (sig) {
          signature = sig
        } else {
          console.log('Registration canceled')
        }
      }
    }

    if (wallet?.walletName === WalletName.Xverse) {
      const signMessageOptions: SignMessageOptions = {
        payload: {
          network: {
            type: network
          },
          address: wallet.ordinalsAddress || '',
          message: msg
        },
        onFinish: (response: any) => {
          signature = response
        },
        onCancel: () => console.log('Registration canceled')
      }
      await signXverseMessage(signMessageOptions).catch(e =>
        console.log(`Error while signing message with Xverse: ${e}`)
      )
    }
    return signature
  }

  return { signMessage }
}
