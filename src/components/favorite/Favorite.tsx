import { useState, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Card, Group, Text, Button, Center } from "@mantine/core";
import {
  getLocalStorageByName,
  setLocalStorageByName,
} from "@src/utils/helpers";
import { IconSquareRoundedMinus } from "@tabler/icons-react";

export default function Favorite() {
  const navigate = useNavigate();

  const [favoriteList, setFavoriteList] = useState([]);

  function getFavoriteList() {
    const localStorageFavoriteList = getLocalStorageByName("favorite");

    if (!localStorageFavoriteList) return;

    setFavoriteList(localStorageFavoriteList);
  }

  function handleRemoveFavorite(
    e: MouseEvent<HTMLButtonElement>,
    favorite: Geocoding
  ) {
    e.stopPropagation();

    const tempFavoriteList = favoriteList.filter(
      (item: Geocoding) => item.name !== favorite.name
    );

    setFavoriteList(tempFavoriteList);
    setLocalStorageByName("favorite", tempFavoriteList);
  }

  useEffect(() => {
    getFavoriteList();
  }, []);

  function handleCardClick(item: Geocoding) {
    navigate("/current-weather", {
      state: {
        cityInfo: item,
      },
    });
  }

  return (
    <Flex direction="column" gap={8} mt={16}>
      {favoriteList.length > 0 ? (
        favoriteList.map((item: Geocoding) => (
          <Card
            key={`${item.name}-${item.country}`}
            withBorder
            styles={{
              root: {
                cursor: "pointer",
                transition: "all .25s ease-in-out",
                "&:hover": {
                  scale: "105%",
                },
              },
            }}
            onClick={() => handleCardClick(item)}
          >
            <Group justify="space-between">
              <Text>{`${item.name} (${item.country})`}</Text>

              <Button
                size="xs"
                variant="outline"
                color="orange"
                leftSection={<IconSquareRoundedMinus className="icon" />}
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
            <Text c="dimmed">Favorite List is empty.</Text>
          </Center>
        </Card>
      )}
    </Flex>
  );
}
