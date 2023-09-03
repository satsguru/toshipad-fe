import React from 'react'
import styles from './Checkbox.module.scss'

type CheckboxProps = {
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  disabled,
  onChange
}) => {
  const baseClass = styles.styledCheckbox
  const colorClass = styles['primary']
  const disabledClass = disabled ? styles.disabled : ''

  const className = `${baseClass} ${colorClass} ${disabledClass}`

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleOnChange}
        className={styles.hiddenCheckbox}
      />
      <span className={styles.checkmark}></span>
    </label>
  )
}
