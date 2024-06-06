import { axiosInstance } from "@src/libs/axios";

type GetDirectGeocodingParams = {
  q: string;
  limit?: number;
};

export const getDirectGeocoding = ({
  q,
  limit = 5,
}: GetDirectGeocodingParams): Promise<Geocoding[]> =>
  axiosInstance({
    method: "get",
    url: "/geo/1.0/direct",
    params: {
      apiKey: import.meta.env.VITE_OPEN_WEATHER_MAP_API_TOKEN,
      q,
      limit,
    },
  });

export default {};
