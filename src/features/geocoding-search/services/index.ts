import { axiosInstance } from '@/libs/axios'

import type { GeocodingObject } from '@/types'

type GetDirectGeocodingParams = {
  q: string
  limit?: number
}

export const GetDirectGeocoding = ({
  q,
  limit = 5,
}: GetDirectGeocodingParams): Promise<GeocodingObject[]> =>
  axiosInstance({
    method: 'get',
    url: '/geo/1.0/direct',
    params: {
      apiKey: import.meta.env.VITE_OPEN_WEATHER_MAP_API_TOKEN,
      q,
      limit,
    },
  })
