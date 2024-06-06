import { useContext } from "react";
import {
  Card,
  Flex,
  Text,
  Badge,
  Image,
  Table,
  ActionIcon,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "@src/services/api/current-weather";
import { CityInfoContext } from "@src/context/city-info";
import {
  IconTemperature,
  IconArrowsDownUp,
  IconDroplet,
  IconThermometer,
  IconSunrise,
  IconSunset,
} from "@tabler/icons-react";
import { getLocaleTime } from "@src/utils/helpers";

import CurrentWeatherActions from "./_components/CurrentWeatherActions";
import CardTitle from "../generic/CardTitle";

export default function CurrentWeather() {
  const cityInfo = useContext(CityInfoContext);

  const { data, dataUpdatedAt, isFetching, refetch } = useQuery<
    CurrentWeather,
    Error
  >({
    queryKey: ["current-weather", cityInfo],
    queryFn: async () =>
      getCurrentWeather({
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      }),
    enabled: !!cityInfo,
  });

  const currentWeatherConfig = [
    {
      name: "Temperature",
      icon: <IconTemperature />,
      value: "",
      suffix: (
        <Text size="sm" fw="bold">
          {data?.main?.temp} ℃
        </Text>
      ),
    },
    {
      name: "Feels Like",
      icon: <IconTemperature />,
      value: `${data?.main.feels_like ?? "-"} ℃`,
    },
    {
      name: "Temp. Range",
      icon: <IconArrowsDownUp />,
      value: "",
      suffix: (
        <Flex justify="flex-end" gap={4}>
          <Badge color="red">{data?.main?.temp_max ?? "-"} ℃</Badge>
          <Badge color="teal">{data?.main?.temp_min ?? "-"} ℃</Badge>
        </Flex>
      ),
    },
    {
      name: "Humidity",
      icon: <IconDroplet />,
      value: `${data?.main.humidity ?? "-"} %`,
    },
    {
      name: "Pressure",
      icon: <IconThermometer />,
      value: `${data?.main.pressure ?? "-"} hPa`,
    },
    {
      name: "Sunrise",
      icon: <IconSunrise />,
      value: data?.sys?.sunrise ? getLocaleTime(data.sys.sunrise * 1000) : "-",
    },
    {
      name: "Sunset",
      icon: <IconSunset />,
      value: data?.sys?.sunset ? getLocaleTime(data.sys.sunset * 1000) : "-",
    },
  ];

  return (
    <Card>
      <CardTitle title="Current Weather" />

      <Flex direction={{ base: "column", sm: "row" }} justify="space-between">
        <Flex direction="column" gap={4}>
          <Badge size="lg">{data?.name}</Badge>
          <Badge color="gray">{data?.sys?.country}</Badge>
        </Flex>

        <Flex direction="column" align="flex-end" gap={4}>
          <Image
            width={60}
            height={60}
            maw={60}
            fit="contain"
            alt="Current weather icon"
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
          />
          <Text>{data?.weather?.[0].main}</Text>
        </Flex>
      </Flex>

      <Table mt={16} verticalSpacing="sm">
        <Table.Tbody>
          {currentWeatherConfig.map((item: any) => (
            <Table.Tr key={item.name}>
              <Table.Td>
                <Flex align="center" gap={4}>
                  <ActionIcon size="xs" variant="transparent" color="gray">
                    {item.icon}
                  </ActionIcon>
                  <Text size="sm" fw="bold">
                    {item.name}
                  </Text>
                </Flex>
              </Table.Td>

              <Table.Td style={{ textAlign: "right" }}>
                {item.suffix ?? (
                  <Text size="sm" fw="bold">
                    {item.value ?? "-"}
                  </Text>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <CurrentWeatherActions
        isFetching={isFetching}
        dataUpdatedAt={dataUpdatedAt}
        refetch={refetch}
      />
    </Card>
  );
}
