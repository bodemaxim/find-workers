<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import SearchPanel from './SearchPanel.vue'

import type { IUser } from '@/interfaces/IUser'

//#region Данные
const user: Ref<IUser | null> = ref<IUser | null>(null)
//#endregion Данные

//#region Методы

//#endregion Методы

//#region События

const onUserViewChanged = (userView: IUser | null) => {
  user.value = userView
}

//#endregion События
</script>

<template>
  <main class="d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="ml-5 text-danger">Жилфонд</h1>
      <p class="mr-5">Пользователь</p>
    </div>
    <div class="flex-grow-1 d-flex">
      <div class="search-panel flex-grow-1 border rounded shadow m-3 p-3">
        <SearchPanel @user-view="onUserViewChanged($event)" />
      </div>
      <div v-if="user" class="view-panel flex-grow-1 border rounded shadow m-3 p-3">
        <h2>{{ user.name }}</h2>
        <p><b>эл. почта: </b>{{ user.email }}</p>
        <p><b>телефон: </b>{{ user.phone }}</p>
        <h3>О себе:</h3>
        <p><b>Имя пользователя: </b>{{ user.username }}</p>
        <p>
          <b>Адрес: </b>{{ user.address.street }}, {{ user.address.suite }},
          {{ user.address.city }}, {{ user.address.zipcode }}
        </p>
        <p><b>Вебсайт: </b>{{ user.website }}</p>
        <h3>Компания:</h3>
        <p><b>Название: </b>{{ user.company.name }}</p>
        <p><b>Девиз: </b>{{ user.company.catchPhrase }}</p>
        <p><b>Вид деятельности: </b>{{ user.company.bs }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}

.search-panel {
  width: 30%;
  max-width: 30%;
}

/* XS */
@media (min-width: 320px) and (max-width: 575px) {
  main {
    font-size: 12px;
  }

  .hideOnMobile {
    visibility: hidden;
  }
}

/* S */
@media (min-width: 576px) and (max-width: 767px) {
  main {
    font-size: 13px;
  }
}

/* M */
@media (min-width: 768px) and (max-width: 991px) {
  .navbar-toggler {
    visibility: hidden;
  }
}

/* L */
@media (min-width: 992px) and (max-width: 1199px) {
}
/* XL */
@media (min-width: 1200px) and (max-width: 1399px) {
}

/* XXL */
@media (min-width: 1400px) {
}

/* Настройки высоты */
@media (max-height: 650px) {
}
</style>
