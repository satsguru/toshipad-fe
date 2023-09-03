import { Typography } from '@mui/material'

import styles from './AboutProject.module.scss'

export const AboutProject = () => (
  <div className={styles.aboutProject}>
    <Typography className={styles.mainTitle}>About Project</Typography>
    <Typography className={styles.desc}>
      Toshi Pad — Defy. Prosper. Repeat. Here the strongest and bravest members
      of the gang elite unite to rebel against the system and empower
      individuals to seize opportunities for wealth. With a unique gang-themed
      approach, our mission is simple yet powerful: to provide an avenue for
      financial success to those who are willing to follow us.
    </Typography>
    <Typography className={styles.desc}>
      0% Taxes, Community Driven, No Team Tokens, CEX Listings, Big Influencers
      Partnerships and surprises along the way. Get ready to experience a
      revolution like no other!
    </Typography>
    <Typography className={styles.smallTitle}>Vision Of The Project</Typography>
    <img
      src="https://i.imgur.com/Vc7jaVc.png"
      className={styles.banner}
      alt=""
    />
    <Typography className={styles.desc}>
      Bitcoin Monkeys are a limited collection of 2500 unique NFTs together with
      Mutant Monkeys — a secondary collection of 5000 unique NFTs built on the
      Stacks (STX) blockchain.
    </Typography>
    <Typography className={styles.desc}>
      The project is developed by an experienced global team across 3 different
      continents! When you own a Bitcoin Monkey or Mutant Monkey, you aren’t
      just a holder of another art piece, you are gaining exclusive membership
      to the Jungle Club.
    </Typography>
    <Typography className={styles.desc}>
      Your NFT will open doors, serving as a digital identity as we embark on
      the journey where benefits and offerings will increase over time.
    </Typography>
  </div>
)
