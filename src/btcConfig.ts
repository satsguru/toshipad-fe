export type Network = 'Mainnet' | 'Testnet'

export const network = 'Mainnet' as Network
export const API_URL: Record<Network, string> = {
  Mainnet: 'https://mempool.space/api/address/',
  Testnet: 'https://mempool.space/testnet/api/address/'
}

export const getAddressUTXOURL = (address: string): string => {
  const baseUrl = API_URL[network]
  return `${baseUrl}${address}/utxo`
}

export const getAddressLastTXS = (address: string): string => {
  const baseUrl = API_URL[network]
  return `${baseUrl}${address}/txs`
}

export const satVB: number = 2
