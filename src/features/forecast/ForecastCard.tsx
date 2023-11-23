import { useContext } from 'react'
import { Badge, Card, Stack, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { GetForecast } from '@src/api'
import { CityInfoContext } from '@src/pages/CurrentWeatherPage'
import {
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import { getLocaleTime } from '@src/utils/helpers'

import type { Forecast, ForecastList } from '@src/types'

function ForecastCard() {
  const cityInfo = useContext(CityInfoContext)

  const { data } = useQuery<Forecast, Error>({
    queryKey: ['forecast', cityInfo],
    queryFn: async () =>
      await GetForecast({
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      }),
    enabled: !!cityInfo,
  })

  const chartTemperatureData = data?.list.map((item: ForecastList) => ({
    time: getLocaleTime(item.dt * 1000),
    temp: item.main.temp,
    tempRange: [item.main.temp_max, item.main.temp_min],
    icon: item.weather[0].icon,
  }))

  const chartHumidityData = data?.list.map((item: ForecastList) => ({
    time: getLocaleTime(item.dt * 1000),
    humidity: item.main.humidity,
  }))

  const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props

    return (
      <svg
        x={cx - 16}
        y={cy - 32}
        width={32}
        height={32}
      >
        <image
          width={32}
          height={32}
          href={`https://openweathermap.org/img/wn/${payload.icon}@2x.png`}
        />
      </svg>
    )
  }

  return (
    <Card
      shadow='sm'
      p={{ base: 'xs', sm: 'lg' }}
      withBorder
    >
      <Badge
        mb={16}
        size='sm'
        variant='gradient'
        gradient={{ from: 'gray.7', to: 'gray.5' }}
      >
        Forecast
      </Badge>

      <Stack
        mt={8}
        h={{ base: 200, sm: 240 }}
      >
        <Text>Temperature (℃)</Text>
        <ResponsiveContainer>
          <ComposedChart
            data={chartTemperatureData}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <CartesianGrid strokeDasharray='2 3' />
            <XAxis dataKey='time' />
            <YAxis
              type='number'
              domain={['auto', 'auto']}
              label={{ value: '℃', position: 'insideLeft' }}
            />
            <Area
              name='Temperature Range'
              dataKey='tempRange'
              stroke='#FFC078'
              fill='#FFE8CC'
            />
            <Line
              type='monotone'
              name='Temperature'
              dataKey='temp'
              stroke='#0CA678'
              dot={<CustomizedDot />}
            />
            <Tooltip />
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>

      <Stack
        mt={8}
        h={{ base: 200, sm: 240 }}
      >
        <Text>Humidity (%)</Text>
        <ResponsiveContainer>
          <ComposedChart
            data={chartHumidityData}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <CartesianGrid strokeDasharray='2 3' />
            <XAxis dataKey='time' />
            <YAxis
              type='number'
              domain={['auto', 'auto']}
              label={{ value: '%', position: 'insideLeft' }}
            />
            <Line
              name='Humidity'
              dataKey='humidity'
              stroke='#1C7ED6'
            />
            <Tooltip />
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  )
}

export default ForecastCard
