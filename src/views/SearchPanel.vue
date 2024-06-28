<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { IUser, ISimpleUserInfo } from '@/interfaces/IUser'

import { getUser, getUsers } from '@/api/UsersSearchAPI'

//#region Props и Emits

const emits = defineEmits<{
  userView: [value: IUser | null]
}>()
//#endregion Props и Emits

//#region Данные

/**
 * Упрощенные данные пользователей.
 */
const usersDataForSearch: Ref<ISimpleUserInfo[]> = ref<ISimpleUserInfo[]>([])

/**
 * Вводимый запрос.
 */
const searchQuery: Ref<string> = ref<string>('')

/**
 * Результаты поиска.
 */
const searchResults: Ref<IUser[]> = ref<IUser[]>([])

//#endregion Данные

//#region Методы

/**
 * Искать сотрудников по ид или нескольким ид.
 */
const onSearch = async () => {
  const parsedQuery: number[] = parseSearchQuery(searchQuery.value)
  console.log(parsedQuery)

  if (parsedQuery.length === 1) await searchUserById(parsedQuery[0])
  else if (parsedQuery.length > 1) await searchUsersByIds(parsedQuery)

  console.log('апи', searchResults.value)
}

/**
 * Инициализировать данные для поиска по именам.
 * Здесь должен быть АПИ запрос, вызываемый при загрузке компонента.
 */
const loadUsersDataForSearch = () => {
  usersDataForSearch.value = [
    { id: 1, username: 'Bret' },
    { id: 2, username: 'Antonette' },
    { id: 3, username: 'Samantha' },
    { id: 4, username: 'Karianne' },
    { id: 5, username: 'Kamren' },
    { id: 6, username: 'Leopoldo_Corkery' },
    { id: 7, username: 'Elwyn.Skyles' },
    { id: 8, username: 'Maxime_Nienow' },
    { id: 9, username: 'Delphine' },
    { id: 10, username: 'Moriah.Stanton' }
  ]
}

/**
 * Поиск пользователя по одному ид.
 */
const searchUserById = async (id: number) => {
  try {
    searchResults.value = await getUser(id)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('done!')
  }
}

/**
 * Поиск пользователей по нескольким ид.
 */
const searchUsersByIds = async (ids: number[]) => {
  try {
    searchResults.value = await getUsers(ids)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('done!')
  }
}

/**
 * Преобразовать строковый запрос в массив идентификаторов.
 */
const parseSearchQuery = (str: string): number[] => {
  const arr: string[] = str.split(', ').map((s) => s.trim())
  const result: number[] = []

  for (const item of arr) {
    const parsedNumber = parseInt(item)

    if (!isNaN(parsedNumber)) {
      result.push(parsedNumber)
    } else {
      const user = usersDataForSearch.value.find((elem) => elem.username === item)
      if (user) result.push(user.id)
    }
  }

  return result
}

const viewUser = (user: IUser) => {
  emits('userView', user)
}
//#endregion Методы

//#region Инициализация

loadUsersDataForSearch()

//#endregion Инициализация
</script>

<template>
  <div class="container mt-5">
    <form @submit.prevent="onSearch">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Поиск..." v-model="searchQuery" />
        <button class="btn btn-outline-secondary" type="submit">Искать</button>
      </div>
    </form>

    <ul class="list-group">
      <li
        class="border rounded mt-1 mb-1 p-3"
        v-for="item in searchResults"
        v-bind:key="item.id"
        @click="viewUser(item)"
      >
        {{ item.username }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
main {
  overflow-y: auto;
}

.list-group {
  max-height: calc(100% - 100px);
  overflow-y: auto;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}

li:hover {
  background-color: lightskyblue;
  cursor: pointer;
  transition: 0.2s;
}
</style>
