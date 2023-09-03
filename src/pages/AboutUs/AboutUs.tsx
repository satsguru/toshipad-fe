import { Images } from 'assets'
import { Council, Partners } from 'components'

import { Quote, TopInfo } from './components'

import styles from './AboutUs.module.scss'

export const AboutUs = () => (
  <div className={styles.main}>
    <div className={styles.shadow1}>
      <img src={Images.bgShadow} alt="" />
    </div>
    <TopInfo />
    <Council bottomShadow={true} />
    <Quote />
    <Partners />
  </div>
)
