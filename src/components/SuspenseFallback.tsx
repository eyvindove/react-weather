import { Skeleton } from '@mantine/core'

function SuspenseFallback() {
  return (
    <>
      <Skeleton
        mt={32}
        height={60}
        circle
      />

      {Array(3)
        .fill('')
        .map((item: string, index: number) => (
          <Skeleton
            key={`${item}${index}`}
            mt={32}
            height={16}
            radius='xl'
          />
        ))}
    </>
  )
}

export default SuspenseFallback
