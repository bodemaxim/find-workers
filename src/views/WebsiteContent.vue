<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'

import SpinningLoader from './SpinningLoader.vue'
import SearchPanel from './SearchPanel.vue'

import type { IUser } from '@/interfaces/IUser'

const store = useStore()
const isLoading = computed(() => store.getters.isLoading)

const user: Ref<IUser | null> = ref<IUser | null>(null)

const onUserViewChanged = (userView: IUser | null) => {
  user.value = userView
}
</script>

<template>
  <main class="d-flex flex-column">
    <SpinningLoader v-if="isLoading" />
    <div class="mx-3 d-flex justify-content-between align-items-center">
      <h1 class="text-danger company-title">Жилфонд</h1>
      <p>Пользователь</p>
    </div>
    <div class="search-view-container">
      <div class="search-panel">
        <SearchPanel @user-view="onUserViewChanged($event)" />
      </div>
      <div class="view-panel">
        <div v-if="user">
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
        <p v-else class="mt-7">Выберите сотрудника, чтобы посмотреть его профиль.</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
}

.search-panel,
.view-panel {
  display: flex;
  flex-grow: 1;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin: 1em;
  padding: 1em;
}

.search-panel {
  width: 30%;
  max-width: 30%;
}

.search-view-container {
  display: flex;
  flex-grow: 1;
}

/* XS */
@media (min-width: 320px) and (max-width: 575px) {
  main {
    font-size: 12px;
  }

  .search-panel {
    display: block;
    width: 100%;
    max-width: calc(100% - 24px);
    height: auto;
    max-height: 60vh;
  }

  .search-view-container {
    display: block;
  }
}

/* S */
@media (min-width: 576px) and (max-width: 767px) {
  main {
    font-size: 13px;
  }
}
</style>
