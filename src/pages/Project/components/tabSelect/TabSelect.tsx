import { Typography } from '@mui/material'

import styles from './TabSelect.module.scss'

export const TabSelect = (props: { openedTab: string; setTab: any }) => {
  return (
    <div className={styles.tabs}>
      <Typography
        onClick={() => {
          props.setTab('About Project')
        }}
        className={
          props.openedTab === 'About Project'
            ? `${styles.oneTab} ${styles.selectedTab}`
            : `${styles.oneTab}`
        }>
        About Project
      </Typography>
      <Typography
        onClick={() => {
          props.setTab('Road Map')
        }}
        className={
          props.openedTab === 'Road Map'
            ? `${styles.oneTab} ${styles.selectedTab}`
            : `${styles.oneTab}`
        }>
        Road Map
      </Typography>
      <Typography
        onClick={() => {
          props.setTab('Tokenomics')
        }}
        className={
          props.openedTab === 'Tokenomics'
            ? `${styles.oneTab} ${styles.selectedTab}`
            : `${styles.oneTab}`
        }>
        Tokenomics
      </Typography>
      <Typography
        onClick={() => {
          props.setTab('Team')
        }}
        className={
          props.openedTab === 'Team'
            ? `${styles.oneTab} ${styles.selectedTab}`
            : `${styles.oneTab}`
        }>
        Team
      </Typography>
    </div>
  )
}
