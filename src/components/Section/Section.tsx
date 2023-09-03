import classNames from 'classnames'
import { forwardRef, PropsWithChildren } from 'react'

import {
  groupBaseClass,
  groupFlexClass,
  groupInnerClass,
  groupPositionClass,
  IStyleGroupBase,
  IStyleGroupFlex,
  IStyleGroupInner,
  IStyleGroupPosition
} from '../Style'

type Style = IStyleGroupBase &
  IStyleGroupFlex &
  IStyleGroupInner &
  IStyleGroupPosition

export interface ISectionProps extends Partial<Style> {
  borderRadius?: boolean
  className?: string
}

export const Section = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ISectionProps>
>((props, ref) => {
  const {
    direction = 'column',
    size = 'md',
    borderRadius,
    children,
    className
  } = props
  const classes = classNames(
    'section',
    { 'section--border-radius': !!borderRadius },
    groupFlexClass({ direction, ...props }),
    groupBaseClass({ size, ...props }),
    groupInnerClass(props),
    groupPositionClass(props),
    className
  )

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
})

export default Section
