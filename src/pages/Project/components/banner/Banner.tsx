import styles from './Banner.module.scss'

export const Banner = ({ src }: any) => (
  <div className={styles.banner}>
    <img src={src} alt="" />
  </div>
)
