import axios from 'axios'
import { notifications } from '@mantine/notifications'

const apiBaseUrl = 'https://api.openweathermap.org/'

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
})

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('axiosInstance response', response)

    if (response.status !== 200) {
      notifications.show({
        color: 'red',
        title: 'System has some problem',
        message: 'Please try again later',
      })

      return
    }

    return response.data
  },
  (error) => {
    console.log('axiosInstance error', error)

    notifications.show({
      color: 'red',
      title: `[${error.code}] ${error.name}`,
      message: error.message,
    })

    return Promise.reject(error)
  }
)
