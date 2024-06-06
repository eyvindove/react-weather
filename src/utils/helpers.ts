export const getLocaleDateTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("zh-TW", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  }).format(timestamp);
};

export const getLocaleTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("zh-TW", {
    timeStyle: "short",
    hour12: false,
  }).format(timestamp);
};

const localStoragePrefix = "__weather__";

export const setLocalStorageByName = (name: string, data: any) => {
  const tempData = JSON.stringify(data);
  localStorage.setItem(`${localStoragePrefix}${name}`, tempData);
};

export const getLocalStorageByName = (name: string) => {
  const tempData = localStorage.getItem(`${localStoragePrefix}${name}`);
  const tempParsedData = tempData ? JSON.parse(tempData) : undefined;

  return tempParsedData;
};
