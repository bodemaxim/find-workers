<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { store } from '@/store/store'

import type { IUser, ISimpleUserInfo } from '@/interfaces/IUser'

import { getUser, getUsers } from '@/api/UsersSearchAPI'

//#region Props и Emits
const emits = defineEmits<{
  userView: [value: IUser | null]
}>()
//#endregion Props и Emits

//#region Лоадер
const setLoadingTrue = () => {
  store.dispatch('toggleLoading', true)
}

const setLoadingFalse = () => {
  store.dispatch('toggleLoading', false)
}
//#endregion Лоадер

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
  if (searchQuery.value.length === 0) {
    emits('userView', null)
    searchResults.value = []
    return
  }

  const parsedQuery: number[] = parseSearchQuery(searchQuery.value)

  if (parsedQuery.length === 1) await searchUserById(parsedQuery[0])
  else if (parsedQuery.length > 1) await searchUsersByIds(parsedQuery)
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
  setLoadingTrue()

  try {
    searchResults.value = await getUser(id)
  } catch (error) {
    console.log(error)
  } finally {
    setLoadingFalse()
  }
}

/**
 * Поиск пользователей по нескольким ид.
 */
const searchUsersByIds = async (ids: number[]) => {
  setLoadingTrue()

  try {
    searchResults.value = await getUsers(ids)
  } catch (error) {
    console.log(error)
  } finally {
    setLoadingFalse()
  }
}

/**
 * Преобразовать строковый запрос в массив идентификаторов.
 */
const parseSearchQuery = (str: string): number[] => {
  const arr: string[] = str.split(',').map((s) => s.trim())
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

watch(
  () => searchQuery.value,
  () => onSearch()
)

loadUsersDataForSearch()
</script>

<template>
  <div class="container mt-5">
    <form>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control search-form"
          placeholder="Поиск..."
          v-model="searchQuery"
        />
      </div>
    </form>

    <v-virtual-scroll :style="{ height: 'calc(100vh - 200px)' }" :items="searchResults">
      <template v-slot:default="{ item }"
        ><p @click="viewUser(item)" class="border rounded mt-1 mb-1 p-3 user-item">
          {{ item.username }}
        </p></template
      >
    </v-virtual-scroll>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Montserrat';
  src: url('@/assets/fonts/Montserrat-Regular.ttf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

main {
  overflow-y: auto;
  font-family: 'Montserrat', sans-serif;
}

.search-form {
  font-family: 'Montserrat', sans-serif;
}

.user-item {
  margin: 0;
  padding: 0;
}

.user-item:hover {
  background-color: lightskyblue;
  cursor: pointer;
  transition: 0.2s;
}
</style>
