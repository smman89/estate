<template>
  <section class="hero container">
    <h2 class="hero__title">Простой способ найти жилье</h2>
    <p class="hero__description">
      Мы предоставляем полный комплекс услуг по продаже, покупке или аренде
      недвижимости. Мы работаем более 10 лет. Ищите миллионы квартир и домов с
      нашей помощью.
    </p>

    <img :src="require('@/assets/img/hero.png')" alt="" class="hero__image" />
  </section>
</template>

<style lang="scss">
.hero {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto 1fr;
  gap: 24px;
  align-items: flex-end;

  &__image {
    grid-column: 6/-1;
    grid-row: 1/-1;
    width: 100%;
  }

  &__title {
    grid-column: 1/7;
    grid-row: 1/2;
    font-family: $font-family--noto-sans;
    font-weight: 700;
    font-size: 56px;
    line-height: 72px;
  }
  &__description {
    grid-column: 1/7;
    grid-row: 2/3;
    font-family: $font-family--noto-sans;
    font-size: 20px;
    line-height: 30px;
    z-index: 2;
  }
}
</style>
