import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell, Box } from '@mantine/core'
import MemorizedHeaderContainer from '@/components/header/HeaderContainer'
import SuspenseFallback from '@/components/SuspenseFallback'

function AppLayout() {
  console.log('tpken', import.meta.env.VITE_OPEN_WEATHER_MAP_API_TOKEN)
  return (
    <AppShell
      padding='xs'
      header={<MemorizedHeaderContainer />}
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
