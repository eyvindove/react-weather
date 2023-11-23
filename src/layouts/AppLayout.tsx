import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell, Box } from '@mantine/core'
import HeaderContainer from '@src/components/header/HeaderContainer'
import SuspenseFallback from '@src/components/SuspenseFallback'

function AppLayout() {
  return (
    <AppShell
      padding='xs'
      header={<HeaderContainer />}
    >
      <Box
        w={{ base: '100%', sm: '70%' }}
        mx='auto'
      >
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </Box>
    </AppShell>
  )
}

export default AppLayout
