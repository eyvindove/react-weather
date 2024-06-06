import { Group, Text } from "@mantine/core";

import AppThemeToggler from "./AppThemeToggler";

export default function AppHeader() {
  return (
    <Group mih="100%" px={16} py={4} justify="space-between">
      <Text>Weather</Text>
      <AppThemeToggler />
    </Group>
  );
}
