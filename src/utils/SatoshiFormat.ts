import BigNumber from 'bignumber.js'

export const SATOSHI_IN_BTC = new BigNumber(10).exponentiatedBy(8)

export const satoshiFormat = (satoshiAmount: string, justNumber?: boolean) => {
  const satoshiAmountNumber = new BigNumber(satoshiAmount)
  if (+satoshiAmountNumber >= 100000) {
    return `${Number(+satoshiAmountNumber.div(SATOSHI_IN_BTC).toString())
      .toFixed(3)
      .toString()
      .replace(/\.?0+$/, '')} BTC`
  }
  if (justNumber) {
    return `${satoshiAmount}`
  }
  return `${satoshiAmount} sats`
}

export const satoshiToBtcFormat = (satoshiAmount: BigNumber): string => {
  const btcAmount = satoshiAmount.dividedBy(SATOSHI_IN_BTC)
  return `${btcAmount.toFixed(8).replace(/\.?0+$/, '')} BTC`
}

export const bitcoinFormat = (btcAmount: string) => {
  const btcAmountNumber = new BigNumber(btcAmount)
  return btcAmountNumber.multipliedBy(SATOSHI_IN_BTC).toString()
}
