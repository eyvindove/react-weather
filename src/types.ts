export interface GeocodingObject {
  name: string
  country: string
  lat: number
  log: number
  local_names: { [key: string]: string }
}

export interface CurrentObject {
  base: string
  clouds: { all: number }
  cod: number
  coord: {
    lat: number
    lon: number
  }
  dt: number
  id: number
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    id: number
    country: string
    sunrise: number
    sunset: number
    type: number
  }
  timezone: number
  visibility: number
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export interface MantineBreadcrumbsItemObject {
  title: string
  href: string
}
