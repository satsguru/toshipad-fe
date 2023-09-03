import { isBoolean, isNumber, isString } from 'lodash-es'

import {
  TStyleBoolOrSize,
  TStyleBreakpointsValues,
  TStyleDirection,
  TStyleWidth
} from '../types'

const isRecord = (value: any): value is TStyleBreakpointsValues => {
  return typeof value === 'object'
}

export function buildClassNames(value?: string, ...values: any[]) {
  return `-${[value, ...values.filter(v => !!v)].join('-')}`
}

type TBemifyValue = string | boolean | undefined | null
type TBemifyValues = TBemifyValue[] | TBemifyValue

export function bemify(b: TBemifyValues, e?: TBemifyValues, m?: TBemifyValues) {
  const make = (target: TBemifyValues, prefix = ''): string => {
    const partials = []

    if (isBoolean(target) || !!!target) {
      return ``
    }

    if (Array.isArray(target)) {
      if (target.length === 0) {
        return ``
      }

      for (const y of target) {
        partials.push(make(y))
      }
    } else {
      partials.push(target)
    }

    return `${prefix}${partials.filter(p => !!p && p.length > 0).join('-')}`
  }

  return `${make(b)}${make(e, '__')}${make(m, '--')}`
}

export function fromDirections(
  values: TStyleDirection,
  prefix: string
): string[] {
  const directions = ['top', 'right', 'bottom', 'left']
  const withSufix = (index: number, value: TStyleBoolOrSize) => {
    const direction = directions[index]
    return value && isString(value) ? `${direction}-${value}` : direction
  }
  let modifiers = [] as any

  switch (values.length) {
    case 4: {
      modifiers = [
        values[0] && withSufix(0, values[0]),
        values[1] && withSufix(1, values[1]),
        values[2] && withSufix(2, values[2]),
        values[3] && withSufix(3, values[3])
      ]
      break
    }
    case 3: {
      modifiers = [
        values[0] && withSufix(0, values[0]),
        values[1] && withSufix(1, values[1]),
        values[2] && withSufix(2, values[2]),
        values[1] && withSufix(3, values[1])
      ]
      break
    }
    case 2: {
      modifiers = [
        values[0] && withSufix(0, values[0]),
        values[1] && withSufix(1, values[1]),
        values[0] && withSufix(2, values[0]),
        values[1] && withSufix(3, values[1])
      ]
      break
    }
    case 1: {
      modifiers = [
        values[0] && withSufix(0, values[0]),
        values[0] && withSufix(1, values[0]),
        values[0] && withSufix(2, values[0]),
        values[0] && withSufix(3, values[0])
      ]
      break
    }
  }

  return modifiers
    .filter((val: boolean | string) => val)
    .map((modifier: string) => `${prefix}-${modifier}`)
}

export function fromResponsive(
  values: TStyleWidth,
  prefix: string,
  target = 'xs'
) {
  const modifiers: string[] = []

  if (isNumber(values)) {
    modifiers.push(`${target}-${values}`)
  }

  if (isRecord(values)) {
    const partials = Object.keys(values).map(size => {
      const value = values[size] as number
      return `${size}-${value}`
    })
    modifiers.push.apply(modifiers, partials)
  }

  return modifiers.map(modifier => `${prefix}-${modifier}`)
}
