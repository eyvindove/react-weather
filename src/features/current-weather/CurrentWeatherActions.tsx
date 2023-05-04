import { useState, useEffect, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { ActionIcon, Button, Flex, Group, Text } from '@mantine/core'
import {
  getLocaleDateTime,
  getLocalStorageByName,
  setLocalStorageByName,
} from '@/utils/helpers'
import { MdAddCircleOutline } from 'react-icons/md'
import { WiRefresh } from 'react-icons/wi'

import type { GeocodingObject } from '@/types'

interface CurrentWeatherActionsProps {
  isFetching: boolean
  dataUpdatedAt: number
  refetch: () => void
}

function CurrentWeatherActions({
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
      (item: GeocodingObject) => item.name === cityInfo.name
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

  function addFavorite() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (localStorageFavoriteList) {
      setLocalStorageByName('favorite', [...localStorageFavoriteList, cityInfo])
    } else {
      setLocalStorageByName('favorite', [cityInfo])
    }

    setIsFavorite(true)
  }

  function removeFavorite() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (!localStorageFavoriteList) return

    setLocalStorageByName(
      'favorite',
      localStorageFavoriteList.filter(
        (favorite: GeocodingObject) => favorite.name !== cityInfo.name
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
          onClick={removeFavorite}
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
          onClick={addFavorite}
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
}

const MemorizedCurrentWeatherActions = memo(CurrentWeatherActions)

export default MemorizedCurrentWeatherActions
