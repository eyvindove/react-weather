import { axiosInstance } from "@src/libs/axios";
import { unit as units } from "@src/config";

type GetForecastParams = {
  lat: number;
  lon: number;
};

export const getForecast = ({
  lat,
  lon,
}: GetForecastParams): Promise<Forecast> =>
  axiosInstance({
    method: "get",
    url: "/data/2.5/forecast",
    params: {
      apiKey: import.meta.env.VITE_OPEN_WEATHER_MAP_API_TOKEN,
      cnt: 9,
      units,
      lat,
      lon,
    },
  });

export default {};
