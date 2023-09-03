import { FC } from 'react'

import { TStyleSize } from '../Style'
import { Text } from '../Typography'

interface INavItemProps {
  size?: TStyleSize
}

export const NavItem: FC<INavItemProps> = ({ children, size = 'md' }) => {
  const baseClass = 'nav-item'
  return (
    <Text className={baseClass} size={size}>
      {children}
    </Text>
  )
}
