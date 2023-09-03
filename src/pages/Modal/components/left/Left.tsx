import { Typography } from '@mui/material'
import { ModalTabs } from 'constants/index'
import { useEffect, useState } from 'react'

import styles from './Left.module.scss'

export const Left = (props: {
  tab: ModalTabs
  tabs: Array<{ tab: ModalTabs; step: number }>
}) => {
  const [currentTab, setCurrentTab] = useState(props.tabs[0])

  useEffect(() => {
    const thisTab = props.tabs.find(e => e.tab === props.tab)
    setCurrentTab(thisTab || props.tabs[0])
  }, [props.tab, props.tabs])

  return (
    <div className={styles.left}>
      <Typography className={styles.title}>Toshipad Launch</Typography>
      <Typography className={styles.mobileStep}>
        Step {currentTab.step} of {props.tabs.length}
      </Typography>
      <div className={styles.points}>
        {props.tabs.map((tabItem, idx) => (
          <div
            key={idx}
            className={
              tabItem.tab === props.tab
                ? `${styles.onePoint} ${styles.selectedPoint}`
                : `${styles.onePoint}`
            }>
            <Typography className={styles.number}>{tabItem.step}</Typography>
            <Typography className={styles.pointTitle}>{tabItem.tab}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
