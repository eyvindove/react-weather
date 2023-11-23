import { Center, Header, Group } from '@mantine/core'
import ColorThemeToggler from './ColorThemeToggler'

function HeaderContainer() {
  return (
    <Header
      height={40}
      px={{ base: 'xs', sm: 'md' }}
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

export default HeaderContainer
