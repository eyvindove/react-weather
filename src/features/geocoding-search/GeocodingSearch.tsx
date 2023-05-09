import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CloseButton, TextInput, Menu, Loader, rem } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useQuery } from '@tanstack/react-query'
import { GetDirectGeocoding } from './services'
import { FcSearch } from 'react-icons/fc'
import FavoriteList from '../favorite-list/FavoriteList'
import DataDeclaration from '@/components/DataDeclaration'

import type { MantineTheme } from '@mantine/core'
import type { GeocodingObject } from '@/types'

const debounceDelay = 1000

function GeocodingSearch() {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText] = useDebouncedValue(searchText, debounceDelay)

  const { data, isFetching } = useQuery<GeocodingObject[], Error>({
    queryKey: ['geocoding', debouncedSearchText],
    queryFn: async () => {
      const response = await GetDirectGeocoding({
        q: debouncedSearchText,
      })

      if (response && response.length === 0) {
        notifications.show({
          color: 'yellow',
          title: '[Warning]',
          message: 'No relevant city names are found.',
        })
      }

      return response
    },
    enabled: !!debouncedSearchText.trim(),
  })

  function menuOnClick(item: GeocodingObject) {
    navigate('/current-weather', {
      state: {
        cityInfo: item,
      },
    })
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const textInputIcon = isFetching ? (
    <Loader
      size='xs'
      variant='dots'
    />
  ) : (
    <FcSearch />
  )

  const textInputRightSection = searchText && (
    <Box onClick={() => setSearchText('')}>
      <CloseButton />
    </Box>
  )

  return (
    <Box sx={{ position: 'relative', marginTop: 16 }}>
      <TextInput
        ref={inputRef}
        placeholder='Search a city name...'
        icon={textInputIcon}
        rightSection={textInputRightSection}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Menu
        opened={data && data.length > 0}
        width='100%'
        styles={(theme: MantineTheme) => ({
          dropdown: {
            position: 'absolute',
            marginTop: rem(48),
            boxShadow: theme.shadows.sm,
          },
        })}
      >
        <Menu.Dropdown>
          {data?.map((item: GeocodingObject, index: number) => (
            <Menu.Item
              key={`${item.country}-${item.name}-${index}`}
              onClick={() => menuOnClick(item)}
            >
              {`${item.name} (${item.country})`}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      <FavoriteList />

      <DataDeclaration />
    </Box>
  )
}

export default GeocodingSearch
