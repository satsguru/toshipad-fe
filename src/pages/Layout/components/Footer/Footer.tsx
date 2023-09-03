import { Button, Typography } from '@mui/material'
import { Icons, Images } from 'assets'
import privacyPolicy from 'legal/privacy_policy.pdf'
import termsPdf from 'legal/terms_and_condition.pdf'

import styles from './footer.module.scss'

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.left}>
      <img src={Images.toshipadLogo} className={styles.logo} alt="ToshiPad" />
      <div className={styles.socials}>
        <Button
          className={styles.oneSocial}
          href="https://discord.com/invite/ordinalscouncil"
          target="_blank">
          <img src={Icons.Socials.discord} alt="Discord" />
        </Button>
        <Button
          className={styles.oneSocial}
          href="https://t.me/+9eED1XpNuuNiOGM1"
          target="_blank">
          <img src={Icons.Socials.telegram} alt="Telegram" />
        </Button>
        <Button
          className={styles.oneSocial}
          href="https://twitter.com/toshipadcom"
          target="_blank">
          <img src={Icons.Socials.twitter} alt="Twitter" />
        </Button>
      </div>
      <div className={styles.bottomLinks}>
        <a href={termsPdf} target="_blank" rel="noopener noreferrer">
          Terms & Conditions
        </a>
        <a href={privacyPolicy} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>

        {/* TODO <a href="https://google.com" target="_blank" rel="noopener noreferrer">*/}
        {/*  Support*/}
        {/*</a>*/}
      </div>
    </div>
    <div className={styles.right}>
      {/*<div className={styles.topTables}>*/}
      {/*  /!*<div className={styles.oneTable}>*!/*/}
      {/*  /!*  <Typography className={styles.tableTitle}>Informations</Typography>*!/*/}
      {/*  /!*  <a href="https://google.com" target="_blank" rel="noreferrer">*!/*/}
      {/*  /!*    Apply for IDO*!/*/}
      {/*  /!*  </a>*!/*/}
      {/*  /!*  <a href="https://google.com" target="_blank" rel="noreferrer">*!/*/}
      {/*  /!*    Calendar*!/*/}
      {/*  /!*  </a>*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  <div className={styles.oneTable}>*/}
      {/*    /!*<Typography className={styles.tableTitle}>Company</Typography>*!/*/}
      {/*    /!*<a href="/about-us" target="_blank" rel="noreferrer">*!/*/}
      {/*    /!*  About Us*!/*/}
      {/*    /!*</a>*!/*/}
      {/*    /!*<a href="https://google.com" target="_blank" rel="noreferrer">*!/*/}
      {/*    /!*  Council*!/*/}
      {/*    /!*</a>*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={`${styles.bottomLinks} ${styles.bottomLinksMobile}`}>
        <a href={termsPdf} target="_blank" rel="noreferrer">
          Terms & Conditions
        </a>
        <a href={privacyPolicy} target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        {/*<a href="https://google.com" target="_blank" rel="noreferrer">*/}
        {/*  Support*/}
        {/*</a>*/}
      </div>
      <Typography className={styles.copyright}>© 2023 ToshiPad</Typography>
    </div>
  </footer>
)
