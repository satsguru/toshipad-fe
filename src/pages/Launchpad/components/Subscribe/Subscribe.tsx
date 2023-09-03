import { Flex, Header } from 'components'

import { EmailForm } from './EmailForm'

import './_subscribe.scss'

export const Subscribe: React.FunctionComponent = () => (
  <Flex className="subscribe-cont">
    <Header className="header" color="black" size="lg">
      Sign up to our newsletter and get the latest news and updates.
    </Header>

    <EmailForm />
  </Flex>
)
