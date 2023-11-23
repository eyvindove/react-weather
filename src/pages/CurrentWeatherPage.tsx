import { createContext } from 'react'
import { useLocation } from 'react-router-dom'
import CurrentWeatherCard from '@src/features/current-weather/CurrentWeatherCard'
import ForecastCard from '@src/features/forecast/ForecastCard'

import type { Geocoding } from '@src/types'

export const CityInfoContext = createContext<Geocoding>({
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
      <CurrentWeatherCard />
      <ForecastCard />
    </CityInfoContext.Provider>
  )
}

export default CurrentWeatherPage
