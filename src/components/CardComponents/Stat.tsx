import { Flex, Text } from 'components'

import './_styles.scss'

type StatsProps = {
  title: string
  value: string
}

export const Stat = ({ title, value }: StatsProps) => (
  <Flex className={'stat'}>
    <Text size="xs" color={'grey6'}>
      {title}
    </Text>
    <Text size="xs">{value}</Text>
  </Flex>
)
