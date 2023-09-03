import { PureComponent, ReactNode } from 'react'

import {
  IStyleSize,
  IStyleTextColor,
  IStyleWeight,
  IStyleWhiteSpace,
  IStyleWordBreak
} from '../Style'
import { getStyledTextProps, getTextContent } from './service'

type Style = IStyleSize &
  IStyleTextColor &
  IStyleWeight &
  IStyleWhiteSpace &
  IStyleWordBreak

export interface ITextProps extends Partial<Style> {
  align?: 'left' | 'right' | 'center'
  block?: boolean
  className?: string
  italic?: boolean
  text?: string | number
  uppercase?: boolean
  ellipsis?: boolean | number
  lineHeight?: 1
  children?: ReactNode
}

export class Text extends PureComponent<ITextProps> {
  static defaultProps: Partial<ITextProps> = {
    size: 'md'
  }

  render() {
    const styledProps = getStyledTextProps(this.props)
    const content = getTextContent(this.props)

    return <span {...styledProps}>{content}</span>
  }
}
export default Text
