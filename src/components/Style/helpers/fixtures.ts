import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

import {
  IStyleGroupGrid,
  IStyleGroupPosition,
  IStyleGroupText,
  TStyleBackground,
  TStyleBoolOrSize,
  TStyleDirection,
  TStyleFlexAlign,
  TStyleFlexDirection,
  TStyleFlexGrow,
  TStyleFlexJustify,
  TStyleFlexWrap,
  TStyleGroupBase,
  TStyleGroupFlex,
  TStyleGroupInner,
  TStyleOffset,
  TStyleOverflowAxis,
  TStyleOverflowValue,
  TStylePosition,
  TStyleSide,
  TStyleSize,
  TStyleTextColor,
  TStyleWeight,
  TStyleWidth,
  TStyleWordBreak
} from '../types'
import { buildClassNames, fromDirections, fromResponsive } from './mixins'

export function weightClass(value?: TStyleWeight) {
  return !!value ? buildClassNames('text-weight', value) : null
}

export function colorClass(value?: TStyleTextColor) {
  return !!value ? buildClassNames('text-color', value) : null
}

export function wordBreakClass(value?: TStyleWordBreak) {
  return !!value ? buildClassNames('word-break', value) : null
}

export function sizeClass(value?: TStyleSize) {
  return !!value ? buildClassNames('size', value) : null
}

export function widthClass(value?: TStyleWidth) {
  if (!value) {
    return null
  }

  return fromResponsive(value, 'width', 'xxs').map(v => buildClassNames(v))
}

export function offsetClass(value?: TStyleOffset) {
  if (!value) {
    return null
  }

  return fromResponsive(value, 'offset').map(v => buildClassNames(v))
}

export function paddingClass(value?: TStyleDirection) {
  if (!value) {
    return null
  }

  return [
    buildClassNames('padding'),
    ...fromDirections(value, 'padding').map(v => buildClassNames(v))
  ]
}

export function marginClass(value?: TStyleDirection) {
  if (!value) {
    return null
  }

  return [
    buildClassNames('margin'),
    ...fromDirections(value, 'margin').map(v => buildClassNames(v))
  ]
}

export function borderClass(value?: TStyleDirection) {
  if (!value) {
    return null
  }

  return [
    buildClassNames('border-width'),
    ...fromDirections(value, 'border-width').map(v => buildClassNames(v))
  ]
}

export function backgroundColorClass(value?: TStyleBackground) {
  return !!value ? buildClassNames('background-color', value) : null
}

export function innerBorderClass(rule?: boolean) {
  return rule ? buildClassNames('inner-border') : null
}

export function innerMarginClass(value?: TStyleBoolOrSize) {
  const selector = 'inner-margin'
  const rootName = buildClassNames(selector)
  if (!value) {
    return null
  }

  return !!value
    ? isString(value)
      ? [rootName, buildClassNames(selector, value)]
      : rootName
    : null
}

export function innerPaddingClass(value?: TStyleBoolOrSize) {
  const selector = 'inner-padding'
  const rootName = buildClassNames(selector)
  if (!value) {
    return null
  }

  return !!value
    ? isString(value)
      ? [rootName, buildClassNames(selector, value)]
      : rootName
    : null
}

export function flexClass(rule?: boolean) {
  return !!rule ? buildClassNames('flex') : null
}

export function flexDirectionClass(value?: TStyleFlexDirection) {
  return !!value ? buildClassNames('flex-direction', value) : null
}

export function flexAlignClass(value?: TStyleFlexAlign) {
  return !!value ? buildClassNames('flex-align', value) : null
}

export function flexJustifyClass(value?: TStyleFlexJustify) {
  return !!value ? buildClassNames('flex-justify', value) : null
}

export function flexGrowClass(value?: TStyleFlexGrow) {
  return isNumber(value) ? buildClassNames('flex-grow', value.toString()) : null
}

export function flexWrapClass(value?: TStyleFlexWrap) {
  return !!value ? buildClassNames('flex-wrap', value) : null
}

export function positionClass(value?: TStylePosition, side?: TStyleSide) {
  return !!value ? buildClassNames('position', value, side || '') : null
}

export function zIndexClass(value?: string) {
  return !!value ? buildClassNames('z-index', value) : null
}

export function overflowClass(
  value?: TStyleOverflowValue,
  axis?: TStyleOverflowAxis
) {
  return !!value ? buildClassNames('overflow', axis, value) : null
}

export function groupBaseClass(props: Partial<TStyleGroupBase>) {
  const group = []

  if (props.border) {
    group.push(borderClass(props.border))
  }

  if (props.margin) {
    group.push(marginClass(props.margin))
  }

  if (props.padding) {
    group.push(paddingClass(props.padding))
  }

  if (props.size) {
    group.push(sizeClass(props.size))
  }

  if (props.width) {
    group.push(widthClass(props.width))
  }

  if (props.background) {
    group.push(backgroundColorClass(props.background))
  }

  return group
}

export function groupBaseProps(props: Partial<TStyleGroupBase>) {
  const { background, border, margin, padding, size, width } = props

  return {
    background,
    border,
    margin,
    padding,
    size,
    width
  }
}

export function groupFlexClass(props: Partial<TStyleGroupFlex>) {
  const group = []

  if (props.flex) {
    group.push(flexClass(props.flex))
  }

  if (props.align) {
    group.push(flexAlignClass(props.align))
  }

  if (props.direction) {
    group.push(flexDirectionClass(props.direction))
  }

  if (isNumber(props.grow)) {
    group.push(flexGrowClass(props.grow))
  }

  if (props.justify) {
    group.push(flexJustifyClass(props.justify))
  }

  if (props.wrap) {
    group.push(flexWrapClass(props.wrap))
  }

  return group
}

export function groupFlexProps(props: Partial<TStyleGroupFlex>) {
  const { align, direction, flex, grow, justify, wrap } = props

  return {
    align,
    direction,
    flex,
    grow,
    justify,
    wrap
  }
}

export function groupInnerClass(props: Partial<TStyleGroupInner>) {
  const group = []

  if (props.innerPadding) {
    group.push(innerPaddingClass(props.innerPadding))
  }

  if (props.innerMargin) {
    group.push(innerMarginClass(props.innerMargin))
  }

  if (props.innerBorder) {
    group.push(innerBorderClass(props.innerBorder))
  }

  return group
}

export function groupInnerProps(props: Partial<TStyleGroupInner>) {
  const { innerBorder, innerMargin, innerPadding } = props

  return {
    innerBorder,
    innerMargin,
    innerPadding
  }
}

export function groupGridClass(props: Partial<IStyleGroupGrid>) {
  const group = []

  if (props.width) {
    group.push(widthClass(props.width))
  }

  if (props.offset) {
    group.push(offsetClass(props.offset))
  }

  return group
}

export function groupGridProps(props: Partial<IStyleGroupGrid>) {
  const { offset, width } = props

  return {
    offset,
    width
  }
}

export function groupTextClass(props: Partial<IStyleGroupText>) {
  const group = []

  if (props.color) {
    group.push(colorClass(props.color))
  }

  if (props.weight) {
    group.push(weightClass(props.weight))
  }

  if (props.wordBreak) {
    group.push(wordBreakClass(props.wordBreak))
  }

  return group
}

export function groupTextProps(props: Partial<IStyleGroupText>) {
  const { color, weight, wordBreak } = props

  return {
    color,
    weight,
    wordBreak
  }
}

export function groupPositionClass(props: Partial<IStyleGroupPosition>) {
  const group = []

  if (props.position) {
    group.push(positionClass(props.position, props.side))
  }

  if (props.zIndex) {
    group.push(zIndexClass(props.zIndex))
  }

  if (props.overflow) {
    group.push(overflowClass(props.overflow, props.overflowAxis))
  }

  return group
}

export function groupPositionProps(props: Partial<IStyleGroupPosition>) {
  const { overflow, overflowAxis, position, side, zIndex } = props

  return {
    overflow,
    overflowAxis,
    position,
    side,
    zIndex
  }
}

export function nonStyleProps(props: any) {
  const {
    align,
    background,
    border,
    color,
    direction,
    flex,
    grow,
    innerBorder,
    innerMargin,
    innerPadding,
    justify,
    margin,
    offset,
    overflow,
    overflowAxis,
    padding,
    position,
    side,
    size,
    weight,
    width,
    wordBreak,
    wrap,
    zIndex,
    ...unmatched
  } = props

  return unmatched
}
