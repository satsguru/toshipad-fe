import { Flex, Header, Text, TStyleSize } from 'components'

import styles from './LaunchpadCommon.module.scss'

type HeaderWithTextProps = {
  title: string
  subtitle: string
  titleSize?: TStyleSize
  subtitleSize?: TStyleSize
}
export const HeaderWithText: React.FunctionComponent<HeaderWithTextProps> = ({
  title,
  subtitle,
  titleSize = 'xl',
  subtitleSize = 'sm'
}) => (
  <div>
    <Flex>
      <Header className={styles.gradientText} size={titleSize}>
        {title}
      </Header>
    </Flex>
    <Flex>
      <Text size={subtitleSize}>{subtitle}</Text>
    </Flex>
  </div>
)
