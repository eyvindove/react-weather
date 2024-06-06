import { createContext } from "react";

export const CityInfoContext = createContext<Geocoding>({
  name: "",
  country: "",
  lat: -1,
  lon: -1,
  local_names: {},
});

export default {};
