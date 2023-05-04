import { memo } from 'react'
import { Anchor, Center, Text } from '@mantine/core'

function DataDeclaration() {
  return (
    <Center>
      <Text
        my={8}
        size='sm'
        color='dimmed'
      >
        Data from{' '}
        <Anchor
          href='https://openweathermap.org/'
          target='_blank'
          color='dimmed'
        >
          OpenWeatherMap
        </Anchor>
        .
      </Text>
    </Center>
  )
}

const MemorizedDataDeclaration = memo(DataDeclaration)

export default MemorizedDataDeclaration
