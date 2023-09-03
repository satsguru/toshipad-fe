export type RegisterUserRequest = {
  public: string
  address: string
  msg: string
  sign: string
  walletType: string
}

export type RegisterUserResponse = {
  withdrawAddress: string
  depositAddress: string
}

export type ConfirmBucketRequest = {
  public: string
  msg: string
  sign: string
}

export type ClaimRequest = {
  public: string
  msg: string
  sign: string
}

export type ClaimStatusResponse = {
  withdrawBrcTx: string
  withdrawBtcTx: string
}
