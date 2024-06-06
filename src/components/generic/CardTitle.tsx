import { Text } from "@mantine/core";

type CardTitleProps = {
  title: string;
};

export default function CardTitle({ title }: CardTitleProps) {
  return (
    <Text
      mb={8}
      fw={900}
      variant="gradient"
      gradient={{ from: "teal", to: "gray", deg: 90 }}
    >
      {title}
    </Text>
  );
}
