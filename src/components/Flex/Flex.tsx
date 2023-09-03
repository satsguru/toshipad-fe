import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren
} from 'react'

import { withFlex } from './withFlex'

type HTMLDivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

interface Props extends HTMLDivElementProps {}

const FlexComponent = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const { ...rest } = props

    return <div ref={ref} {...rest} />
  }
)

export const Flex = withFlex(FlexComponent)
export default Flex
