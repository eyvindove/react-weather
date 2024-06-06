import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function AppThemeToggler() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  function toggleScheme() {
    const targetScheme = colorScheme === "light" ? "dark" : "light" ?? "dark";

    setColorScheme(targetScheme);
  }

  return (
    <ActionIcon
      variant="default"
      aria-label="Theme Toggler"
      onClick={() => toggleScheme()}
    >
      {colorScheme === "light" ? (
        <IconSun className="icon" stroke={1.5} />
      ) : (
        <IconMoon className="icon" stroke={1.5} />
      )}
    </ActionIcon>
  );
}
