import { axiosInstance } from '@src/libs/axios'
import { unit as units } from '@src/utils/config'

import type { CurrentWeather } from '@src/types'

type GetCurrentWeatherParams = {
  lat: number
  lon: number
}

export const GetCurrentWeather = ({
  lat,
  lon,
}: GetCurrentWeatherParams): Promise<CurrentWeather> =>
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
