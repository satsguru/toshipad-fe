import React, { FC } from 'react'

interface SimpleAnchorProps {
  link: string
  children: React.ReactNode
}

export const Anchor: FC<SimpleAnchorProps> = ({ link, children }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="simple-anchor">
    {children}
  </a>
)
