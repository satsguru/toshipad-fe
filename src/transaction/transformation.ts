import BigNumber from 'bignumber.js'

const toAssetInfo = (token: string) =>
  ['uusd', 'uluna'].includes(token)
    ? { native_token: { denom: token } }
    : { token: { contract_addr: token } }

export const toToken = (amount: string, token: string) => ({
  amount,
  info: toAssetInfo(token)
})

export const toNumber = (
  value?: BigNumber | BigNumber.Value,
  decimal: number = 6
) => new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toNumber()

export const toFromatedPrec = (value?: BigNumber, decimal: number = 6) =>
  new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toPrecision(6)

export const toFormat = (
  value?: BigNumber | BigNumber.Value,
  decimal: number = 6,
  precision: number = 2
) =>
  new BigNumber(value || 0)
    .div(new BigNumber(10).pow(decimal))
    .toFormat(precision, BigNumber.ROUND_FLOOR)

export const toPercent = (value?: string, dp = 2): string =>
  new BigNumber(value || 0).isFinite()
    ? toDecimal(times(value, 100), dp) + ' %'
    : ''

export const toDecimal = (value = '0', dp = 6) =>
  new BigNumber(value).decimalPlaces(dp, BigNumber.ROUND_DOWN).toString()

export const toBase64 = (object: object) => {
  try {
    return Buffer.from(JSON.stringify(object)).toString('base64')
  } catch (error) {
    return ''
  }
}

export const toBoolean = (value: string) => (value === 'true' ? true : false)

// MATH
export const div = (a?: BigNumber.Value, b?: BigNumber.Value): string =>
  new BigNumber(a || 0).div(b || 1).toString()

export const plus = (a?: BigNumber.Value, b?: BigNumber.Value): string =>
  new BigNumber(a || 0).plus(b || 0).toString()

export const minus = (a?: BigNumber.Value, b?: BigNumber.Value): string =>
  new BigNumber(a || 0).minus(b || 0).toString()

export const times = (a?: BigNumber.Value, b?: BigNumber.Value): string =>
  new BigNumber(a || 0).times(b || 0).toString()
