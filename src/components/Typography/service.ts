import classNames from 'classnames'
import { isNumber, isString } from 'lodash-es'

import { groupTextClass } from '../Style'
import { ITextProps } from './Text'

export const getStyledTextProps = (props: ITextProps) => {
  const {
    weight,
    color,
    wordBreak,
    italic,
    uppercase,
    block,
    ellipsis,
    lineHeight,
    size,
    align,
    whiteSpace,
    className,
    text
  } = props

  const classes = classNames(
    'el-t',
    groupTextClass({ weight, color, wordBreak }),
    {
      'el-t--italic': italic,
      'el-t--uppercase': uppercase,
      'el-t--block': block,
      'el-t--ellipsis': !isNumber(ellipsis) && !!ellipsis,
      'el-t--line-height-1': lineHeight,
      [`el-t--size-${size}`]: !!size,
      [`el-t--align-${align}`]: !!align,
      [`el-t--white-space-${whiteSpace}`]: !!whiteSpace
    },
    className
  )

  return {
    className: classes,
    title: ellipsis && text ? text.toString() : undefined
  }
}

export const getTextContent = ({ text, ellipsis, children }: ITextProps) => {
  const displayedText = isNumber(text) || isString(text) ? text?.toString() : ''

  const ellipsisText =
    isNumber(ellipsis) &&
    displayedText &&
    ellipsis > 0 &&
    ellipsis < displayedText.length
      ? `${displayedText.substr(0, ellipsis)}...`
      : undefined

  return ellipsisText || displayedText || children
}
