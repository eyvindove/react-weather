import { Skeleton } from "@mantine/core";

export default function AppSuspenseFallback() {
  return (
    <>
      <Skeleton mt={32} height={60} circle />

      {Array(3)
        .fill("")
        .map((item: string, index: number) => (
          <Skeleton
            key={`${item}${index * 1}`}
            mt={32}
            height={16}
            radius="xl"
          />
        ))}
    </>
  );
}
