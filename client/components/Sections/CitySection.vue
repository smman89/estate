<template>
  <section class="cities container">
    <h2 class="cities__header">Поиск объявлений по городам</h2>
    <a href="#" class="cities__link">Просмотреть все</a>
    <ul class="cities__list">
      <li v-for="(city, key) of cities" :key="key" class="cities__item">
        <a :href="city.link" class="cities__link">
          <img
            :src="require(`@/assets/img/${city.image}`)"
            :alt="city.name"
            class="cities__image"
          />
          <h3 class="cities__name">{{ city.name }}</h3>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        { name: 'Москва', image: 'moscow.jpg', url: '' },
        { name: 'Санкт-Петербург', image: 'spb.jpg', url: '' },
        { name: 'Новосибирск', image: 'novosibirsk.jpg', url: '' },
        { name: 'Краснодар', image: 'krasnodar.jpg', url: '' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.cities {
  margin-bottom: 132px;
  display: grid;
  grid-template-areas:
    'header link'
    'list list';
  justify-content: space-between;
  align-items: center;
}
.cities__header {
  grid-area: header;
  margin: 0;
  font-size: 28px;
  line-height: 36px;
  font-family: $font-family--noto-sans;
  color: $primaryBlack;
  font-weight: 700;
}
.cities__list {
  grid-area: list;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap: 24px;

  list-style: none;
  padding: 0;
  margin-top: 32px;
}
.cities__link {
  grid-area: link;
  text-align: right;
}

.cities__item {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;

  border-radius: 12px;
  box-shadow: 0px 2px 2px -2px rgba(31, 27, 45, 0.08),
    0px 4px 12px rgba(31, 27, 45, 0.08);
}

.cities__image {
  flex-shrink: 1;
  width: 100%;
  border-radius: 12px;
}

.cities__name {
  text-align: center;
}
</style>
