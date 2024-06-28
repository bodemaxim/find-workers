import axios from 'axios'
import type { AxiosResponse } from 'axios'
import axiosInstance from '@//api/apiInstance'

import type { IUser } from '@/interfaces/IUser'


/**
 * Загрузить данные пользователя.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const getUser = async (id: number): Promise<IUser[]> => {
  return await axiosInstance
    .get<IUser[]>(`https://jsonplaceholder.typicode.com/users?id=${id}`)
    .then((response: AxiosResponse<IUser[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}

/**
 * Загрузить данные пользователей, введенных в строку поиска через запятую.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const getUsers = async (ids: number[]): Promise<IUser[]> => {
  let param = ''
  let arr = []

  for (const item of ids) {
    let str = 'id=' + item
    arr.push(str)
  }

  param  = arr.join('&')

  return await axiosInstance
    .get<IUser[]>(`https://jsonplaceholder.typicode.com/users?${param}`)
    .then((response: AxiosResponse<IUser[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}
