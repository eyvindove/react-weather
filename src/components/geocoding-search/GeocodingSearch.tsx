import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, ActionIcon, Loader, Menu } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { IconSearch, IconBackspace } from "@tabler/icons-react";
import { getDirectGeocoding } from "@src/services/api/geocoding";

const DEBOUNCE_DELAY = 1000;

export default function GeocodingSearch() {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebouncedValue(searchText, DEBOUNCE_DELAY);

  const { data, isFetching } = useQuery<Geocoding[], Error>({
    queryKey: ["geocoding", debouncedSearchText],
    queryFn: async () => {
      const response = await getDirectGeocoding({
        q: debouncedSearchText,
      });

      if (response && response.length === 0) {
        notifications.show({
          color: "yellow",
          title: "[Warning]",
          message: "No relevant city names are found.",
        });
      }

      return response;
    },
    enabled: !!debouncedSearchText.trim(),
  });

  function handleMenuClick(item: Geocoding) {
    navigate("/current-weather", {
      state: {
        cityInfo: item,
      },
    });
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const leftSection = isFetching ? (
    <Loader size="xs" variant="dots" />
  ) : (
    <IconSearch className="icon" />
  );

  const rightSection = searchText && searchText !== "" && (
    <ActionIcon
      variant="transparent"
      color="gray"
      aria-label="Backspace"
      onClick={() => setSearchText("")}
    >
      <IconBackspace className="icon" />
    </ActionIcon>
  );

  return (
    <Menu opened={data && data.length > 0} withArrow position="bottom-start">
      <Menu.Target>
        <TextInput
          ref={inputRef}
          placeholder="Search by city name..."
          leftSection={leftSection}
          rightSection={rightSection}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Menu.Target>

      {data && data.length > 0 && (
        <Menu.Dropdown>
          {data.map((item: Geocoding, index: number) => (
            <Menu.Item
              key={`${item.country}-${item.name}-${index * 1}`}
              onClick={() => handleMenuClick(item)}
            >
              {`${item.name} (${item.country})`}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
