import classNames from 'classnames'
import { ComponentType, forwardRef } from 'react'

import {
  groupBaseClass,
  groupFlexClass,
  groupGridClass,
  groupInnerClass,
  groupPositionClass,
  IStyleGroupBase,
  IStyleGroupFlex,
  IStyleGroupGrid,
  IStyleGroupInner,
  IStyleGroupPosition,
  nonStyleProps
} from '../Style'

type StyleProps = IStyleGroupBase &
  IStyleGroupFlex &
  IStyleGroupInner &
  IStyleGroupGrid &
  IStyleGroupPosition

export interface IFlexProps extends StyleProps {
  className?: string
}

export function withFlex<P = {}>(Component: ComponentType<P>) {
  return forwardRef<HTMLDivElement, P & IFlexProps>(
    ({ flex = true, ...props }, ref) => {
      const nsProps = nonStyleProps(props)
      const { className, ...rest } = nsProps

      const rootName = 'el-flex'
      const classes = classNames(
        rootName,
        groupFlexClass({ flex, ...props }),
        groupBaseClass(props),
        groupInnerClass(props),
        groupGridClass(props),
        groupPositionClass(props),
        className
      )

      return <Component ref={ref} className={classes} {...rest} />
    }
  )
}
