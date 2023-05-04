import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

function ColorThemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position='center'>
      <ActionIcon
        variant='default'
        onClick={() => toggleColorScheme()}
      >
        {colorScheme === 'dark' ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineDarkMode />
        )}
      </ActionIcon>
    </Group>
  )
}

export default ColorThemeToggler
