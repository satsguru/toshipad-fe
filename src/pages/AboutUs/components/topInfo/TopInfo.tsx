import { Typography } from '@mui/material'
import { Images } from 'assets'

import styles from './TopInfo.module.scss'

export const TopInfo = () => (
  <div className={styles.aboutUs}>
    <h2 className={styles.h2}>About us</h2>
    <Typography className={styles.desc}>
      Toshipad is a groundbreaking launchpad and incubator, leading the frontier
      in BRC-20 tokens and advancing the development of Bitcoin's blockchain
      ecosystem.
    </Typography>
    <Typography className={styles.desc}>
      Powered by The Council, a prominent group of industry experts including
      CEOs, venture capitalists, founders, creators, and digital asset veterans,
      we are driven by a collective mission to foster the widespread adoption of
      Bitcoin while actively supporting its growth and evolution in Ordinals &
      BRC20.
    </Typography>
    <div className={styles.bottom}>
      <img src={Images.aboutUs} className={styles.left} alt="" />
      <div className={styles.right}>
        <Typography className={styles.rightDesc}>
          As a trusted launchpad, Toshipad empowers projects to unlock the full
          potential of their BRC-20 tokens. Through the expertise of The Council
          and our team of diligent analysts, selected projects undergo a
          thorough vetting and due diligence process before their launch. This
          ensures the highest standards of quality, security, and innovation,
          therefore, providing the much-needed support to developers looking to
          build on the world's first, most secure, and decentralized blockchain.
        </Typography>
        <Typography className={styles.rightDesc}>
          ToshiPad's growth capabilities stem from its robust infrastructure
          platform, designed to facilitate the deployment of turnkey solutions
          for BRC20 projects on the Bitcoin network.
        </Typography>
      </div>
    </div>
  </div>
)
