// import { base64 } from '@scure/base'
import { network } from 'btcConfig'
import { useWallet } from 'contexts'
// import * as btcSigner from '@scure/btc-signer'
import { signTransaction } from 'sats-connect'
// import { getUTXOsService, UTXO } from 'services/userService'
import { WalletName } from 'types'

export const useSendBitcoin = () => {
  const { walletData, registeredUserData, setLastTx } = useWallet()

  // TODO XVERSE send needs to be polished, current solution works, but do not build under next.js building script, as packages used are deprecated.
  // const bitcoinNet =
  //   network === 'Mainnet'
  //     ? {
  //         bech32: 'bc',
  //         pubKeyHash: 0x00,
  //         scriptHash: 0x05,
  //         wif: 0x80
  //       }
  //     : {
  //         bech32: 'tb',
  //         pubKeyHash: 0x6f,
  //         scriptHash: 0xc4,
  //         wif: 0xef
  //       }

  // const getLastUTXOAndBalance = (utxos: UTXO[]) => {
  //   const balance = utxos.reduce((acc, utxo) => acc + utxo.value, 0)

  //   let lastOutput = null
  //   if (utxos.length > 0) {
  //     lastOutput = {
  //       tx_hash: utxos[utxos.length - 1].txid,
  //       tx_output_n: utxos[utxos.length - 1].vout,
  //       value: utxos[utxos.length - 1].value
  //     }
  //   }
  //   return { balance, lastOutput }
  // }

  const createPSBT = async (
    paymentAddress: string,
    paymentPublic: string,
    recipient: string,
    amountToSend: number
  ) => {
    console.log(paymentAddress, paymentPublic, recipient, amountToSend)
    return ''
    // TODO XVERSE send needs to be polished, current solution works, but do not build under next.js building script, as packages used are deprecated.
    // const outputs = await getUTXOsService(paymentAddress)
    // const { lastOutput, balance } = getLastUTXOAndBalance(outputs)
    // if (lastOutput) {
    //   const tx = new btcSigner.Transaction()
    //   const publicKeyUint8Array = new Uint8Array(
    //     // @ts-ignore
    //     paymentPublic.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    //   )
    //   const p2wpkh = btcSigner.p2wpkh(publicKeyUint8Array, bitcoinNet)
    //   const p2sh = btcSigner.p2sh(p2wpkh, bitcoinNet)

    //   tx.addInput({
    //     txid: lastOutput.tx_hash,
    //     index: lastOutput.tx_output_n,
    //     witnessUtxo: {
    //       script: p2sh.script,
    //       amount: BigInt(lastOutput.value)
    //     },
    //     redeemScript: p2sh.redeemScript
    //   })

    //   tx.addOutputAddress(recipient, BigInt(amountToSend), bitcoinNet) // [0]
    //   tx.addOutputAddress(paymentAddress, BigInt(balance), bitcoinNet) // [1]

    //   const estimatedFee = tx.toPSBT(0).length * satVB

    //   const changeAmount = balance - amountToSend - estimatedFee
    //   tx.updateOutput(1, { amount: BigInt(changeAmount) })
    //   const psbt = tx.toPSBT(0)
    //   return base64.encode(psbt)
    // }
    // return ''
  }

  const sendBitcoin = async (amountSatoshi: string) => {
    let txId: string = ''
    const amountSat = Number(amountSatoshi)
    if (walletData?.walletName === WalletName.Hiro) {
      const hiro = (window as any).btc
      if (hiro) {
        const resp = await hiro.request('sendTransfer', {
          address:
            network === 'Mainnet'
              ? registeredUserData?.depositAddress
              : walletData.paymentAddress,
          amount: amountSat,
          network: network.toLowerCase()
        })
        txId = resp.result.txid
      }
    }

    if (walletData?.walletName === WalletName.UniSat) {
      const unisat = (window as any).unisat
      if (unisat) {
        try {
          const txid = await (window as any).unisat
            .sendBitcoin(
              network === 'Mainnet'
                ? registeredUserData?.depositAddress
                : walletData.paymentAddress,
              amountSat
            )
            .catch((e: any) => console.log(e))
          txId = txid
        } catch (e) {
          console.log((e as any).message)
        }
      }
    }

    if (walletData?.walletName === WalletName.Xverse) {
      if (
        walletData.paymentAddress &&
        walletData.paymentPublicKey &&
        registeredUserData &&
        registeredUserData.depositAddress
      ) {
        const psbtBase64 = await createPSBT(
          walletData.paymentAddress,
          walletData.paymentPublicKey,
          network === 'Mainnet'
            ? registeredUserData.depositAddress
            : walletData.paymentAddress,
          10
        )

        const signPsbtOptions = {
          payload: {
            network: {
              type: network
            },
            message: 'Sign Transaction',
            psbtBase64,
            broadcast: true,
            inputsToSign: [
              {
                address: walletData.paymentAddress,
                signingIndexes: [0]
              }
            ]
          },
          onFinish: (response: any) => {
            txId = response.txId
          },
          onCancel: (e: any) => {
            console.log(e)
          }
        }
        // @ts-ignore
        await signTransaction(signPsbtOptions).catch(e => console.log(e))
      }
    }
    setLastTx(txId)
  }
  return { sendBitcoin }
}
