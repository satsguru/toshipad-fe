export enum Messages {
  REGISTER = 'Sign up for Toshipad.\n\nRegistration is a one-time, mandatory, and free process.',
  GET_DEPOSIT_ADDRESS = '{"action":"get_deposit"}',
  SELECT_SMALL_BUCKET = "Sign the message to confirm your IDO allocation choice (Bronze Bucket).\n\nPlease note: This decision is irreversible and can't be altered later.",
  SELECT_MEDIUM_BUCKET = "Sign the message to confirm your IDO allocation choice (Silver Bucket).\n\nPlease note: This decision is irreversible and can't be altered later.",
  SELECT_LARGE_BUCKET = "Sign the message to confirm your IDO allocation choice (Gold Bucket).\n\nPlease note: This decision is irreversible and can't be altered later.",
  CLAIM = "Sign the message to confirm your IDO allocation Claim.\n\nPlease note: This decision is irreversible and can't be altered later."
}

export enum ApiMessages {
  REGISTER = '{"action":"register"}',
  GET_DEPOSIT_ADDRESS = '{"action":"get_deposit"}',
  SELECT_SMALL_BUCKET = '{"action":"selectBucketSmall"}',
  SELECT_MEDIUM_BUCKET = '{"action":"selectBucketMedium"}',
  SELECT_LARGE_BUCKET = '{"action":"selectBucketLarge"}',
  CLAIM = '{"action":"claim"}'
}

export enum ModalTabs {
  Bucket = 'Select Bucket',
  BucketConfirmSelection = 'Confirm Selection',
  Payments = 'Payments',
  TransactionSummary = 'Transaction Summary',
  // WaitingForPayment = 'Waitings For Payment',
  TransactionSuccess = 'Application Success'
}

export enum BucketTypes {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold'
}

export enum PaymentMethod {
  ConnectedWallet = 'connected_wallet',
  ExternalWallet = 'external_wallet',
  QRCode = 'qr_code'
}

export enum WalletLinks {
  Hiro = 'https://wallet.hiro.so/#download',
  UniSat = 'https://unisat.io/',
  Xverse = 'https://www.xverse.app/download'
}
