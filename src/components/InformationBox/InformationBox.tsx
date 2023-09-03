import { PropsWithChildren } from 'react'

import { Flex } from '../Flex/Flex'
import { TStyleDirection } from '../Style'

import './_information-box.scss'

export interface IInformationBoxProps {
  onClick?: () => void
  active: boolean
  width?: string
  height?: string
  color?: string
  padding?: TStyleDirection
  className?: string
}

const InformationBox = ({
  children,
  active = true,
  onClick,
  width,
  height,
  color,
  padding = ['md'],
  className
}: PropsWithChildren<IInformationBoxProps>) => {
  const baseClass = 'information-box'
  return (
    <div
      className={`${baseClass} ${active && 'active'} ${
        onClick && 'clickable'
      } ${color}-choosed ${className}`}
      style={{ width, height }}
      onClick={onClick}>
      <Flex
        className={`${baseClass}-wrapper`}
        direction="column"
        padding={padding}
        align="center"
        justify="center">
        {children}
      </Flex>
    </div>
  )
}

export default InformationBox
