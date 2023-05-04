export const getLocaleDateTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('zh-TW', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false,
  }).format(timestamp)
}

export const getLocaleTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('zh-TW', {
    timeStyle: 'short',
    hour12: false,
  }).format(timestamp)
}

const localStoragePrefix = '__weather__'

export const setLocalStorageByName = (name: string, data: any) => {
  const _data = JSON.stringify(data)
  localStorage.setItem(`${localStoragePrefix}${name}`, _data)
}

export const getLocalStorageByName = (name: string) => {
  const _data = localStorage.getItem(`${localStoragePrefix}${name}`)
  const _parsedData = _data ? JSON.parse(_data) : undefined

  return _parsedData
}
