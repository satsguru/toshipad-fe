import { Images } from 'assets'
import { Flex, Header, Text } from 'components'
import { useMedia } from 'react-use'

import stylesCommon from '../LaunchpadCommon.module.scss'
import stylesHero from './HeroSection.module.scss'

export const HeroSection = () => {
  const isSmallScreen = useMedia('(max-width: 450px)')

  return (
    <Flex className={stylesHero.heroCont} align="center">
      <img src={Images.dots} alt="" className={stylesHero.dots} />
      <img src={Images.dots} alt="" className={stylesHero.dotsRotated} />
      <img src={Images.dotsMobile} alt="" className={stylesHero.dotsMobile} />
      <img
        src={Images.dotsMobile}
        alt=""
        className={stylesHero.dotsMobileRotated}
      />
      <Flex>
        <Header
          align="center"
          size={isSmallScreen ? 'xl' : 'xxl'}
          className={`${stylesCommon.gradientText} ${stylesHero.heroHeader}`}
          text="Discover Toshipad"
        />
      </Flex>
      <Text
        className={stylesHero.heroDescription}
        size={isSmallScreen ? 'xs' : 'sm'}
        align="center">
        Toshipad is the pioneering launchpad and incubator, spearheading the
        advancement of BRC-20 tokens and the development of Bitcoin's blockchain
        ecosystem. Discover what Toshipad has to offer with their highly vetted,
        secure & innovative ecosystem of premier projects.
      </Text>
    </Flex>
  )
}
