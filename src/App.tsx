import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@src/router'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@src/libs/tanstack-query'
import ErrorBoundary from './features/ErrorBoundry'
import '@src/styles/index.css'
import { theme } from '@src/styles/mantine-theme'

import type { ColorScheme } from '@mantine/core'

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')

  function toggleColorScheme(value?: ColorScheme) {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          ...theme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
