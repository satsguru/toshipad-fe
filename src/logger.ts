export const logError = (type: string, error?: any, walletAddress?: string) => {
  const msg = error?.message
  const details = error?.response?.data?.error

  console.error(msg)
  ;(window as any).newrelic.noticeError(
    `ST ${type} ${msg} , ${details}, ${walletAddress}}`
  )
}
