import { FC } from 'react'

import './_label.scss'

interface ILabelProps {
  hasValue?: boolean
}

export const Label: FC<ILabelProps> = ({ children, hasValue = false }) => {
  const baseCLass = 'label'
  return (
    <div className={`${baseCLass} ${hasValue && `${baseCLass}-ready`}`}>
      {children}
    </div>
  )
}
