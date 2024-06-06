import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Button, Text, ActionIcon, Group } from "@mantine/core";
import {
  getLocaleDateTime,
  getLocalStorageByName,
  setLocalStorageByName,
} from "@src/utils/helpers";
import { IconSquareRoundedPlus, IconRefresh } from "@tabler/icons-react";

type CurrentWeatherActionsProps = {
  isFetching: boolean;
  dataUpdatedAt: number;
  refetch: () => void;
};

export default function CurrentWeatherActions({
  isFetching,
  dataUpdatedAt,
  refetch,
}: CurrentWeatherActionsProps) {
  const location = useLocation();
  const cityInfo = location.state?.cityInfo;

  const [isFavorite, setIsFavorite] = useState(false);

  function checkIsFavorite() {
    const localStorageFavoriteList = getLocalStorageByName("favorite");

    if (!localStorageFavoriteList) return;

    const hasFavorite = localStorageFavoriteList.find(
      (item: Geocoding) => item.name === cityInfo.name
    );

    if (hasFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  useEffect(() => {
    checkIsFavorite();
  }, []);

  function handleAddFavorite() {
    const localStorageFavoriteList = getLocalStorageByName("favorite");

    if (localStorageFavoriteList) {
      setLocalStorageByName("favorite", [
        ...localStorageFavoriteList,
        cityInfo,
      ]);
    } else {
      setLocalStorageByName("favorite", [cityInfo]);
    }

    setIsFavorite(true);
  }

  function handleRemoveFavorite() {
    const localStorageFavoriteList = getLocalStorageByName("favorite");

    if (!localStorageFavoriteList) return;

    setLocalStorageByName(
      "favorite",
      localStorageFavoriteList.filter(
        (favorite: Geocoding) => favorite.name !== cityInfo.name
      )
    );
    setIsFavorite(false);
  }

  return (
    <Flex mt={16} justify="space-between">
      <Button
        variant={isFavorite ? "filled" : "outline"}
        color="teal"
        size="xs"
        onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      >
        {!isFavorite && (
          <IconSquareRoundedPlus className="icon" style={{ marginRight: 4 }} />
        )}
        Favorite
      </Button>

      <Group gap="xs">
        <Text size="sm" c="gray.5">
          {getLocaleDateTime(dataUpdatedAt)}
        </Text>

        <ActionIcon
          variant="outline"
          color="gray"
          size="sm"
          aria-label="Refresh"
          loading={isFetching}
          disabled={isFetching}
          onClick={refetch}
        >
          <IconRefresh className="icon" />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
