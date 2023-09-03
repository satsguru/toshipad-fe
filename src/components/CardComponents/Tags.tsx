import { Flex, Text } from 'components'

import './_styles.scss'

type TagsProps = {
  tags: string[]
}

export const Tags: React.FunctionComponent<TagsProps> = ({ tags }) => (
  <Flex className={'tags'}>
    {tags.map((tag, index) => (
      <Text key={index} size="xs" className={'tag'}>
        {tag}
      </Text>
    ))}
  </Flex>
)
