import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const CurrentWeatherPage = lazy(() => import('@/pages/CurrentWeatherPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/current-weather',
        element: <CurrentWeatherPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
