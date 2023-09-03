import { Typography } from '@mui/material'
import { PartnerLogos } from 'assets'

import styles from './Partners.module.scss'

const partnersList = [
  {
    name: 'Binance NFT',
    logo: PartnerLogos.binanceNft,
    link: 'https://www.binance.com/en/nft/home'
  },
  {
    name: 'BTC Culture',
    logo: PartnerLogos.btcCulture,
    link: 'https://twitter.com/BTC_Culture'
  },
  {
    name: 'Centauri',
    logo: PartnerLogos.centauri,
    link: 'https://twitter.com/Centaurilabs'
  },
  {
    name: 'Fomocraft',
    logo: PartnerLogos.fomocraft,
    link: 'https://fomocraft.com/'
  },
  {
    name: 'GDA Capital',
    logo: PartnerLogos.gdaCapital,
    link: 'https://gda.capital/'
  },
  {
    name: 'JPEG Culture',
    logo: PartnerLogos.jpegCulture,
    link: 'https://jpegculture.com/'
  },
  {
    name: 'LucidBlue Ventures',
    logo: PartnerLogos.lucidBlue,
    link: 'https://www.lucidblueventures.com/'
  },
  {
    name: 'Magic Eden',
    logo: PartnerLogos.magicEden,
    link: 'https://magiceden.io/'
  },
  {
    name: 'Niftables',
    logo: PartnerLogos.niftables,
    link: 'https://www.niftables.com/'
  },
  { name: 'OKEx', logo: PartnerLogos.okex, link: 'https://www.okx.com/' },
  {
    name: 'Ordinals Wallet',
    logo: PartnerLogos.ordinalsWallet,
    link: 'https://ordinalswallet.com/'
  },
  {
    name: 'Sheesha Finance',
    logo: PartnerLogos.sheeshaFinance,
    link: 'https://sheeshafinance.io/'
  },
  {
    name: 'Sky Vision Capital',
    logo: PartnerLogos.skyVision,
    link: 'https://www.skyvisioncapital.com/'
  },
  {
    name: 'Xverse Wallet',
    logo: PartnerLogos.xverseWallet,
    link: 'https://www.xverse.app/'
  },
  {
    name: 'ZogiLabs',
    logo: PartnerLogos.zogiLabs,
    link: 'https://www.zogilabs.io/'
  }
]

export const Partners = () => (
  <div className={styles.partners}>
    <h2 className={styles.h2}>Our Partnerships</h2>
    <Typography className={styles.topDesc}>
      Together, we're reshaping the blockchain landscape. Discover our strategic
      alliances and be part of the change.
    </Typography>

    <div className={styles.list}>
      {partnersList.map(element => {
        return (
          <div className={styles.onePartner} key={element.name}>
            <a href={element.link} target="_blank" rel="noreferrer">
              <img src={element.logo} alt={element.name} />
            </a>
          </div>
        )
      })}
    </div>
  </div>
)
