import { Flex } from 'components'

import './_styles.scss'

type BannerWithLogoProps = {
  bannerUrl: string
  logoUrl: string
}

export const BannerWithLogo: React.FunctionComponent<BannerWithLogoProps> = ({
  bannerUrl,
  logoUrl
}) => (
  <Flex className={'bannerWithLogo'}>
    <div className="bannerWrapper">
      <img src={bannerUrl} alt="banner" />
    </div>
    <div className="logoWrapper">
      <img src={logoUrl} alt="logo" />
    </div>
  </Flex>
)
