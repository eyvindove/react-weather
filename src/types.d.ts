declare global {
  export type Geocoding = {
    name: string;
    country: string;
    lat: number;
    lon: number;
    local_names: { [key: string]: string };
  };

  export type CurrentWeather = {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: {
      lat: number;
      lon: number;
    };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: string;
    sys: {
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
      type: number;
    };
    timezone: number;
    visibility: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    wind: {
      deg: number;
      speed: number;
    };
  };

  export type AppBreadcrumbsItem = {
    title: string;
    href: string;
  };

  export type ForecastList = {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  };

  export type ForecastCity = {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };

  export type Forecast = {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastList[];
    city: ForecastCity;
  };
}

export default {};
