import classNames from 'classnames'
import { forwardRef, PropsWithChildren } from 'react'

import { ISectionProps, Section } from '../Section'

interface Props extends ISectionProps {}

export const Container = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const { className, padding = ['md'], ...restSectionProps } = props
    const classes = classNames('container', className)

    return (
      <Section
        ref={ref}
        className={classes}
        padding={padding}
        {...restSectionProps}
      />
    )
  }
)
