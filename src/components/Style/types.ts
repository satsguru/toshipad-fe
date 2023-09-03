// #region Generics

export interface IStyleColor<T> {
  color: T
}

export interface IStyleTheme<T> {
  theme: T
}

// #endregion Generics

// #region Base

export type TStyleDirection =
  | [TStyleBoolOrSize]
  | [TStyleBoolOrSize, TStyleBoolOrSize]
  | [TStyleBoolOrSize, TStyleBoolOrSize, TStyleBoolOrSize]
  | [TStyleBoolOrSize, TStyleBoolOrSize, TStyleBoolOrSize, TStyleBoolOrSize]

export type TStyleSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | string

export type TStyleBoolOrSize = boolean | TStyleSize

export type TStyleWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

export type TStyleColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'background-primary'
  | 'background-secondary'
  | 'black1'
  | 'grey1'
  | 'grey2'
  | 'grey3'
  | 'grey4'
  | 'grey5'
  | 'grey6'
  | 'grey7'
  | 'grey8'
  | 'success'
  | 'error'
  | 'green'
  | 'red'
  | 'black'
  | 'white'

export type TStyleTextColor = TStyleColor

export type TStyleBackground = TStyleColor

export interface IStyleSize {
  size: TStyleSize
}

export interface IStylePadding {
  padding: TStyleDirection
}

export interface IStyleMargin {
  margin: TStyleDirection
}

export interface IStyleBorder {
  border: TStyleDirection
}

export interface IStyleBackground {
  background: TStyleBackground
}

// #region GroupBase

export type TStyleGroupBase = IStyleSize &
  IStyleWidth &
  IStylePadding &
  IStyleMargin &
  IStyleBorder &
  IStyleBackground

export interface IStyleGroupBase extends Partial<TStyleGroupBase> {}

// #endregion GroupBase

// #endregion Base

// #region Inner

export interface IStyleInnerPadding {
  innerPadding: TStyleBoolOrSize
}

export interface IStyleInnerMargin {
  innerMargin: TStyleBoolOrSize
}

export interface IStyleInnerBorder {
  innerBorder: boolean
}

// #region GroupInner

export type TStyleGroupInner = IStyleInnerPadding &
  IStyleInnerMargin &
  IStyleInnerBorder

export interface IStyleGroupInner extends Partial<TStyleGroupInner> {}

// #endregion GroupInner

// #endregion Inner

// #region Flex

export interface IStyleFlex {
  flex: boolean
}

export type TStyleFlexDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'

export interface IStyleFlexDirection {
  direction: TStyleFlexDirection
}

export type TStyleFlexGrow = 0 | 1

export interface IStyleFlexGrow {
  grow: TStyleFlexGrow
}

export type TStyleFlexAlign =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'baseline'

export interface IStyleFlexAlign {
  align: TStyleFlexAlign
}

export type TStyleFlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export interface IStyleFlexJustify {
  justify: TStyleFlexJustify
}

export type TStyleFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export interface IStyleFlexWrap {
  wrap: TStyleFlexWrap
}

// #region GroupFlex

export type TStyleGroupFlex = IStyleFlex &
  IStyleFlexDirection &
  IStyleFlexGrow &
  IStyleFlexAlign &
  IStyleFlexJustify &
  IStyleFlexWrap

export interface IStyleGroupFlex extends Partial<TStyleGroupFlex> {}

// #endregion GroupFlex

// #endregion Flex

// #region Position

export type TStylePosition = 'relative' | 'absolute' | 'fixed' | 'sticky'
export type TStyleSide = 'top' | 'left' | 'bottom' | 'right'

export type TStyleOverflowValue = 'auto' | 'scroll' | 'hidden' | 'visible'
export type TStyleOverflowAxis = 'x' | 'y'

export interface IStylePosition {
  position: TStylePosition
  side?: TStyleSide
}

export interface IStyleZIndex {
  zIndex: string
}

export interface IStyleOverflow {
  overflow: TStyleOverflowValue
  overflowAxis?: TStyleOverflowAxis
}

// #region PositionGroup

export type TStyleGroupPosition = IStylePosition & IStyleZIndex & IStyleOverflow

export interface IStyleGroupPosition extends Partial<TStyleGroupPosition> {}

// #endregion PositionGroup

// #endregion Position

// #region Grid

// TODO: find a way to import values from TStyle Size
// something like this
// [key: TStyleSize]: number
// [U in TStyleSize]: number

export type TStyleBreakpointsValues = Record<TStyleSize, number>

export type TStyleWidth = TStyleBreakpointsValues | number

export interface IStyleWidth {
  width: TStyleWidth
}

export type TStyleOffset = TStyleBreakpointsValues | number

export interface IStyleOffset {
  offset: TStyleOffset
}

// #region GroupGrid

export type TStyleGroupGrid = IStyleWidth & IStyleOffset

export interface IStyleGroupGrid extends Partial<TStyleGroupGrid> {}

// #endregion GroupGrid

// #endregion Grid

// #region Text

export type TStyleWordBreak = 'all' | 'word'

export interface IStyleWordBreak {
  wordBreak: TStyleWordBreak
}

export interface IStyleWeight {
  weight: TStyleWeight
}

export interface IStyleTextColor extends IStyleColor<TStyleTextColor> {}

export type TStyleWhiteSpace =
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-wrap'
  | 'pre-line'

export interface IStyleWhiteSpace {
  whiteSpace: TStyleWhiteSpace
}

// #region TextGroup

export type TStyleGroupText = IStyleWeight & IStyleTextColor & IStyleWordBreak

export interface IStyleGroupText extends Partial<TStyleGroupText> {}

// #endregion TextGroup

// #endregion Text
