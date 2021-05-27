<template>
  <header class="page-header container">
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <NuxtLink to="/properties" class="main-nav__link">Объявления</NuxtLink>
        </li>
        <li class="main-nav__item">
          <NuxtLink to="/rules" class="main-nav__link">Правила</NuxtLink>
        </li>
        <li class="main-nav__item">
          <NuxtLink to="/contacts" class="main-nav__link">Контакты</NuxtLink>
        </li>
      </ul>
      <ul class="main-nav__list user-list">
        <li class="user-list__item" v-if="username">
          <NuxtLink class="user-list__login" to="/account/personal-info">{{ username }}</NuxtLink>
        </li>
        <li class="user-list__item" v-if="!username">
          <NuxtLink class="user-list__login" to="/login">Войти</NuxtLink>
        </li>
        <li class="user-list__item">
          <NuxtLink to="/account/add-property" class="user-list__add-property button button--primary button--rounded"
            >+ Подать объявление</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.user.username
    }
  }
}
</script>


<style lang="scss" scoped>
.main-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.main-nav__list {
  display: flex;
  list-style: none;
  align-items: center;
  padding: 0;
}

.main-nav__item {
  margin: 0 12px;
}
.main-nav__link {
  text-decoration: none;
}

.user-list__login {
  margin-right: 32px;
  text-decoration: none;
}
</style>
