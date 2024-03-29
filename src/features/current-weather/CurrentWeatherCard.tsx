import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Table,
  Text,
  rem,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { GetCurrentWeather } from '@src/api'
import { getLocaleTime } from '@src/utils/helpers'
import { IconContext } from 'react-icons'
import {
  WiThermometer,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiBarometer,
} from 'react-icons/wi'
import { CityInfoContext } from '@src/pages/CurrentWeatherPage'
import MantineBreadcrumbs from '@src/components/mantine/MantineBreadcrumbs'
import DataDeclaration from '@src/components/DataDeclaration'
import CurrentWeatherActions from './CurrentWeatherActions'

import type { CurrentWeather, MantineBreadcrumbsItem } from '@src/types'

const breadcrumbsConfig: MantineBreadcrumbsItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Current Weather',
    href: '',
  },
]

function CurrentWeatherCard() {
  const cityInfo = useContext(CityInfoContext)

  const navigate = useNavigate()

  const { data, dataUpdatedAt, refetch, isFetching } = useQuery<
    CurrentWeather,
    Error
  >({
    queryKey: ['current-weather', cityInfo],
    queryFn: async () =>
      await GetCurrentWeather({
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      }),
    enabled: !!cityInfo,
  })

  const currentWeatherConfig = [
    {
      name: 'Temperature',
      value: '',
      icon: <WiThermometer />,
      suffix: (
        <Text
          fz='xl'
          fw={700}
          variant='gradient'
          gradient={{ from: 'teal.3', to: 'lime.3', deg: 45 }}
        >
          {data?.main.temp} ℃
        </Text>
      ),
    },
    {
      name: 'Temp. Range',
      value: '',
      suffix: (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={rem(8)}
        >
          <Badge color='red'>{`${data?.main.temp_max ?? '-'} ℃`}</Badge>
          <Badge color='indigo'>{`${data?.main.temp_min ?? '-'} ℃`}</Badge>
        </Flex>
      ),
    },
    {
      name: 'Feels Like',
      value: `${data?.main.feels_like ?? '-'} ℃`,
    },
    {
      name: 'Humidity',
      value: `${data?.main.humidity ?? '-'} %`,
      icon: <WiHumidity />,
    },
    {
      name: 'Pressure',
      value: `${data?.main.pressure ?? '-'} hPa`,
      icon: <WiBarometer />,
    },
    {
      name: 'Sunrise',
      value: data ? getLocaleTime(data?.sys.sunrise * 1000) : '-',
      icon: <WiSunrise />,
    },
    {
      name: 'Sunset',
      value: data ? getLocaleTime(data?.sys.sunset * 1000) : '-',
      icon: <WiSunset />,
    },
  ]

  function checkCityInfoValid() {
    if (!cityInfo) {
      notifications.show({
        color: 'yellow',
        title: 'Permission Denied',
        message: 'Please select the city again.',
      })
      navigate('/')
    }
  }

  useEffect(() => {
    checkCityInfoValid()
  }, [])

  return (
    <>
      <MantineBreadcrumbs items={breadcrumbsConfig} />

      <Card
        shadow='sm'
        padding='xl'
        withBorder
      >
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align='flex-start'
          justify={{ base: 'space-between' }}
          gap={8}
        >
          <Flex
            direction='column'
            align='flex-start'
            gap={8}
          >
            <Badge
              size='xl'
              variant='gradient'
              gradient={{ from: 'teal', to: 'lime' }}
            >
              {data?.name}
            </Badge>
            <Badge
              color='gray'
              size='md'
            >
              {data?.sys.country}
            </Badge>
          </Flex>

          <Box sx={{ alignSelf: 'flex-end' }}>
            <Image
              width={60}
              alt='Current weather icon'
              src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            />
            <Text fz='lg'>{data?.weather[0].main}</Text>
          </Box>
        </Flex>

        <Table
          mt={8}
          verticalSpacing='sm'
          highlightOnHover
        >
          <tbody>
            {currentWeatherConfig.map((item: any, index: number) => (
              <tr key={index}>
                <td width='50%'>
                  <Flex
                    align='center'
                    gap={4}
                  >
                    <IconContext.Provider value={{ size: '16' }}>
                      {item.icon}
                    </IconContext.Provider>
                    <Text fw='bold'>{item.name}</Text>
                  </Flex>
                </td>
                <td width='50%'>
                  <Group position='right'>
                    <Text fw='bold'>{item.value}</Text>
                    {item.suffix}
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CurrentWeatherActions
          isFetching={isFetching}
          dataUpdatedAt={dataUpdatedAt}
          refetch={refetch}
        />
      </Card>

      <DataDeclaration />
    </>
  )
}

export default CurrentWeatherCard
