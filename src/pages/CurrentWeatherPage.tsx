import { useLocation } from "react-router-dom";
import { CityInfoContext } from "@src/context/city-info";
import AppBreadcrumb from "@src/components/app/AppBreadcrumb";
import CurrentWeather from "@src/components/current-weather/CurrentWeather";
import AppDataDeclaration from "@src/components/app/AppDataSourceDeclaration";
import Forecast from "@src/components/forecast/Forecast";

const breadcrumbsConfig: AppBreadcrumbsItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Current Weather",
    href: "",
  },
];

export default function CurrentWeatherPage() {
  const location = useLocation();
  const { cityInfo } = location.state;

  return (
    <CityInfoContext.Provider value={cityInfo}>
      <AppBreadcrumb items={breadcrumbsConfig} />
      <CurrentWeather />
      <AppDataDeclaration />
      <Forecast />
    </CityInfoContext.Provider>
  );
}
