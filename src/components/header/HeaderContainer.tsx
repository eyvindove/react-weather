import { memo } from 'react'
import { Center, Header, Group } from '@mantine/core'
import ColorThemeToggler from './ColorThemeToggler'

function HeaderContainer() {
  return (
    <Header
      height={40}
      px='md'
    >
      <Group
        h='100%'
        position='apart'
      >
        <Center>Weather</Center>

        <ColorThemeToggler />
      </Group>
    </Header>
  )
}

const MemorizedHeaderContainer = memo(HeaderContainer)

export default MemorizedHeaderContainer
