<template>
  <header class="page-header container">
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <a href="#" class="main-nav__link">Объявления</a>
        </li>
        <li class="main-nav__item">
          <a href="#" class="main-nav__link">Правила</a>
        </li>
        <li class="main-nav__item">
          <a href="#" class="main-nav__link">Контакты</a>
        </li>
      </ul>
      <ul class="main-nav__list user-list">
        <li class="user-list__item">
          <a class="user-list__login" href="">Войти</a>
        </li>
        <li class="user-list__item">
          <a class="user-list__add-property button" href=""
            >+ Подать объявление</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

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
