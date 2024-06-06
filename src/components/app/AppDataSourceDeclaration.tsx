import { Anchor, Center, Text } from "@mantine/core";

function AppDataDeclaration() {
  return (
    <Center>
      <Text my={8} size="sm" c="dimmed">
        Data from{" "}
        <Anchor href="https://openweathermap.org/" target="_blank" c="dimmed">
          OpenWeatherMap
        </Anchor>
        .
      </Text>
    </Center>
  );
}

export default AppDataDeclaration;
