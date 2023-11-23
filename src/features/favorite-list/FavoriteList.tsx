import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Center, Group, Stack, Text } from '@mantine/core'
import {
  getLocalStorageByName,
  setLocalStorageByName,
} from '@src/utils/helpers'
import { MdRemoveCircleOutline } from 'react-icons/md'

import type { MouseEvent } from 'react'
import type { Geocoding } from '@src/types'

function FavoriteList() {
  const navigate = useNavigate()

  const [favoriteList, setFavoriteList] = useState([])

  function getFavoriteList() {
    const localStorageFavoriteList = getLocalStorageByName('favorite')

    if (!localStorageFavoriteList) return

    setFavoriteList(localStorageFavoriteList)
  }

  function handleCardClick(item: Geocoding) {
    navigate('/current-weather', {
      state: {
        cityInfo: item,
      },
    })
  }

  function handleRemoveFavorite(
    e: MouseEvent<HTMLButtonElement>,
    favorite: Geocoding
  ) {
    e.stopPropagation()

    const _favoriteList = favoriteList.filter(
      (item: Geocoding) => item.name !== favorite.name
    )

    setFavoriteList(_favoriteList)
    setLocalStorageByName('favorite', _favoriteList)
  }

  useEffect(() => {
    getFavoriteList()
  }, [])

  return (
    <Stack mt={32}>
      {favoriteList.length > 0 ? (
        favoriteList.map((item: Geocoding) => (
          <Card
            key={`${item.name}-${item.country}`}
            withBorder
            sx={{
              cursor: 'pointer',
              transition: 'all .25s ease-in-out',
              '&:hover': {
                scale: '105%',
              },
            }}
            onClick={() => handleCardClick(item)}
          >
            <Group position='apart'>
              <Text>{`${item.name} (${item.country})`}</Text>

              <Button
                size='sm'
                variant='outline'
                color='orange'
                compact
                leftIcon={<MdRemoveCircleOutline />}
                onClick={(e) => handleRemoveFavorite(e, item)}
              >
                Remove
              </Button>
            </Group>
          </Card>
        ))
      ) : (
        <Card withBorder>
          <Center>
            <Text color='dimmed'>Favorite List is empty.</Text>
          </Center>
        </Card>
      )}
    </Stack>
  )
}

export default FavoriteList
