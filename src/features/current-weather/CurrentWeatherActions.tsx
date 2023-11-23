import { useState, useEffect, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { ActionIcon, Button, Flex, Group, Text } from '@mantine/core'
import {
  getLocaleDateTime,
  getLocalStorageByName,
  setLocalStorageByName,
} from '@src/utils/helpers'
import { MdAddCircleOutline } from 'react-icons/md'
import { WiRefresh } from 'react-icons/wi'

import type { Geocoding } from '@src/types'

interface CurrentWeatherActionsProps {
  isFetching: boolean
  dataUpdatedAt: number
  refetch: () => void
}

const CurrentWeatherActions = memo(function CurrentWeatherActions({
  isFetching,
  dataUpdatedAt,
  refetch,
}: CurrentWeatherActionsProps) {
  const location = useLocation()
  const cityInfo = location.state?.cityInfo

  const [isFavorite, setIsFavorite] = useState(false)

  function checkIsFavorite() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (!localStorageFavoriteList) return

    const hasFavorite = localStorageFavoriteList.find(
      (item: Geocoding) => item.name === cityInfo.name
    )

    if (hasFavorite) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }

  useEffect(() => {
    checkIsFavorite()
  }, [])

  function handleAddFavorite() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (localStorageFavoriteList) {
      setLocalStorageByName('favorite', [...localStorageFavoriteList, cityInfo])
    } else {
      setLocalStorageByName('favorite', [cityInfo])
    }

    setIsFavorite(true)
  }

  function handleRemoveFavorite() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (!localStorageFavoriteList) return

    setLocalStorageByName(
      'favorite',
      localStorageFavoriteList.filter(
        (favorite: Geocoding) => favorite.name !== cityInfo.name
      )
    )
    setIsFavorite(false)
  }

  return (
    <Group
      position='apart'
      mt={16}
    >
      {isFavorite ? (
        <Button
          size='sm'
          color='teal'
          compact
          onClick={handleRemoveFavorite}
        >
          Favorite
        </Button>
      ) : (
        <Button
          size='sm'
          variant='outline'
          color='teal'
          compact
          leftIcon={<MdAddCircleOutline />}
          onClick={handleAddFavorite}
        >
          Favorite
        </Button>
      )}

      <Flex
        align='center'
        justify='end'
        gap={8}
      >
        <Text
          size='sm'
          c='gray.5'
        >
          {getLocaleDateTime(dataUpdatedAt)}
        </Text>

        <ActionIcon
          variant='default'
          size='sm'
          loading={isFetching}
          onClick={() => refetch()}
        >
          <WiRefresh />
        </ActionIcon>
      </Flex>
    </Group>
  )
})

export default CurrentWeatherActions
