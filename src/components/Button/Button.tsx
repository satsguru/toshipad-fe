import { Button as MuiButton } from '@mui/material'

import styles from './Button.module.scss'

type ButtonProps =
  | {
      text: string
      color: 'primary' | 'black' | 'grey'
      subscribe?: boolean
      disabled?: boolean
      href?: string
      onClick?: never
    }
  | {
      text: string
      color: 'primary' | 'black' | 'grey'
      subscribe?: boolean
      disabled?: boolean
      href?: never
      onClick?: VoidFunction
    }

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  color,
  disabled,
  href,
  onClick,
  subscribe
}) => {
  const baseClass = styles.styledButton
  const colorClass = styles[color]
  const subscribeClass = subscribe ? styles.subscribe : ''
  const disabledClass = disabled ? styles.disabled : ''

  const className = `${baseClass} ${colorClass} ${subscribeClass} ${disabledClass}`

  return (
    <MuiButton
      className={className}
      disabled={disabled}
      onClick={onClick}
      href={href}>
      {text}
    </MuiButton>
  )
}
