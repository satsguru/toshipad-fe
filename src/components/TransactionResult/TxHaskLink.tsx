import Link from '@material-ui/core/Link'
import { Flex } from 'components'
import { FC } from 'react'

interface TxHashProps {
  txHash: string
}
const EXPLORER_URL = ''
const getEllipsisTxt = (text: string = '', n = 6) => {
  return `${text.substr(0, n)}...${text.substr(text.length - n, text.length)}`
}

const TxHashLink: FC<TxHashProps> = ({ txHash }) => {
  return (
    <Flex direction="column" align="flex-start" justify="center">
      <p>Check on Terra Finder</p>

      <Link
        className="link-text"
        href={`${EXPLORER_URL}/${txHash}`}
        target="_blank">
        {getEllipsisTxt(txHash)}
      </Link>
    </Flex>
  )
}
export default TxHashLink
