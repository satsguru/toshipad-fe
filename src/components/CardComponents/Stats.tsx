import { Flex } from 'components'

import { satoshiFormat } from '../../utils/SatoshiFormat'
import { Stat } from './Stat'

import './_styles.scss'

type StatsProps = {
  title1: string
  value1?: string
  title2: string
  value2?: string
}

export const Stats: React.FunctionComponent<StatsProps> = ({
  title1,
  value1,
  title2,
  value2
}) => (
  <Flex className={'stats'}>
    <Stat title={title1} value={value1 ? satoshiFormat(value1) : 'TBA'} />
    <Stat title={title2} value={value2 ? satoshiFormat(value2) : 'TBA'} />
  </Flex>
)
