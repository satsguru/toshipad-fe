import classNames from 'classnames'
import { isNumber, isString } from 'lodash-es'
import { PureComponent } from 'react'

import {
  groupTextClass,
  IStyleSize,
  IStyleTextColor,
  IStyleWeight,
  IStyleWhiteSpace
} from '../Style'

type Style = IStyleSize & IStyleTextColor & IStyleWeight & IStyleWhiteSpace

export type HeaderTagType = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface IHeaderProps extends Partial<Style> {
  align?: 'left' | 'right' | 'center'
  className?: string
  uppercase?: boolean
  text?: string
  ellipsis?: number
  tagType?: HeaderTagType
  id?: string
}

export class Header extends PureComponent<IHeaderProps> {
  static defaultProps: Partial<IHeaderProps> = {
    size: 'md',
    weight: 'semibold'
  }

  render() {
    const {
      align,
      className,
      size,
      weight,
      color,
      text,
      uppercase,
      children,
      ellipsis,
      whiteSpace,
      id,
      tagType: Component = 'span'
    } = this.props

    const displayedText =
      isNumber(text) || isString(text) ? text.toString() : ''

    const ellipsisText =
      isNumber(ellipsis) &&
      displayedText &&
      ellipsis > 0 &&
      ellipsis < displayedText.length
        ? `${displayedText.substr(0, ellipsis)}...`
        : undefined

    const classes = classNames(
      'el-header',
      {
        [`el-t--size-${size}`]: !!size,
        'el-t--uppercase': uppercase,
        'el-t--ellipsis': isNumber(ellipsis) || ellipsis,
        [`el-t--align-${align}`]: !!align,
        [`el-t--white-space-${whiteSpace}`]: !!whiteSpace
      },
      groupTextClass({ weight, color }),
      className
    )

    return (
      <Component id={id} className={classes}>
        {ellipsisText || displayedText || children}
      </Component>
    )
  }
}
export default Header
