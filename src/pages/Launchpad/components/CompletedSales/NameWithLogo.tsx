import styles from './completedSales.module.scss'

type NameWithLogoProps = {
  name: string
  logoUrl: string
}

export const NameWithLogo: React.FunctionComponent<NameWithLogoProps> = ({
  name,
  logoUrl
}) => (
  <div className={styles.name}>
    <div className={styles.tableLogoWrapper}>
      <img src={logoUrl} alt="logo" />
    </div>
    {name}
  </div>
)
