import { createContext } from 'react'
import { useLocation } from 'react-router-dom'
import CurrentWeather from '@/features/current-weather/CurrentWeather'
import Forecast from '@/features/forecast/Forecast'

import type { GeocodingObject } from '@/types'

export const CityInfoContext = createContext<GeocodingObject>({
  name: '',
  country: '',
  lat: -1,
  lon: -1,
  local_names: {},
})

function CurrentWeatherPage() {
  const location = useLocation()
  const cityInfo = location.state?.cityInfo

  return (
    <CityInfoContext.Provider value={cityInfo}>
      <CurrentWeather />
      <Forecast />
    </CityInfoContext.Provider>
  )
}

export default CurrentWeatherPage
