import { axiosInstance } from '@/libs/axios'
import { unit as units } from '@/utils/config'

import type { CurrentObject } from '@/types'

type GetCurrentWeatherParams = {
  lat: number
  lon: number
}

export const GetCurrentWeather = ({
  lat,
  lon,
}: GetCurrentWeatherParams): Promise<CurrentObject> =>
  axiosInstance({
    method: 'get',
    url: '/data/2.5/weather',
    params: {
      apiKey: import.meta.env.VITE_OPEN_WEATHER_MAP_API_TOKEN,
      units,
      lat,
      lon,
    },
  })
