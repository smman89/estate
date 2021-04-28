<template>
  <footer class="page-footer">
    <div class="container">
      <div class="page-footer__list">
        <ul class="page-footer__item contacts">
          <li class="contacts__email">info@gmail.com</li>
          <li class="contacts__phone">8-800-000-0000</li>
        </ul>

        <div class="fast-links">
          <h3 class="fast-links__title">Быстрые ссылки</h3>
          <ul class="fast-links__list">
            <li class="fast-links__item">
              <a href="#" class="fast-links__link"> Подать объявление</a>
            </li>
          </ul>
        </div>
        <div class="about">
          <h3 class="about__title">О компании</h3>
          <ul class="about__list"></ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  background-color: $lightGrey;
}

.page-footer__list {
  display: flex;
  flex-direction: row;
  padding: 0;
}
.page-footer__item {
  padding: 0;
}

.contacts {
  list-style: none;
}

.fast-links__list {
  list-style: none;
}

.about {
  display: flex;
  flex-direction: column;
}
</style>
