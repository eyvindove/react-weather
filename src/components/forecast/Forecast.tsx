import { useContext, useEffect } from "react";
import { Card, Text, Flex } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@src/services/api/forecast";
import { CityInfoContext } from "@src/context/city-info";
import { getLocaleTime } from "@src/utils/helpers";

import CardTitle from "../generic/CardTitle";

export default function Forecast() {
  const cityInfo = useContext(CityInfoContext);

  const { data } = useQuery<Forecast, Error>({
    queryKey: ["forecast", cityInfo],
    queryFn: async () =>
      getForecast({
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      }),
    enabled: !!cityInfo,
  });

  const chartTemperatureData = data?.list.map((item: ForecastList) => ({
    time: getLocaleTime(item.dt * 1000),
    temp: item.main.temp,
    tempMax: item.main.temp_max,
    tempMin: item.main.temp_min,
    icon: item.weather[0].icon,
  }));

  const chartHumidityData = data?.list.map((item: ForecastList) => ({
    time: getLocaleTime(item.dt * 1000),
    humidity: item.main.humidity,
  }));

  /**
   * ! Workaround for defaultProps XAxis & YAxis error message
   */
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <Card withBorder>
      <CardTitle title="Forecast" />

      <Flex direction="column" gap={32}>
        {chartTemperatureData && (
          <>
            <Text>Temperature (℃)</Text>
            <LineChart
              mt={16}
              h={300}
              data={chartTemperatureData}
              dataKey="time"
              unit="℃"
              series={[
                { name: "temp", color: "gray" },
                { name: "tempMax", color: "red" },
                { name: "tempMin", color: "teal" },
              ]}
              curveType="linear"
              yAxisProps={{ domain: ["auto", "auto"] }}
            />
          </>
        )}

        {chartHumidityData && (
          <>
            <Text>Humidity (%)</Text>
            <LineChart
              mt={16}
              h={300}
              data={chartHumidityData}
              dataKey="time"
              unit="%"
              series={[{ name: "humidity", color: "indigo" }]}
              curveType="linear"
              yAxisProps={{ domain: ["auto", "auto"] }}
            />
          </>
        )}
      </Flex>
    </Card>
  );
}
