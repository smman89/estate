<template>
  <div>
    <header class="page-header"></header>
    <main>
      <section class="hero container"></section>
      <section class="services container">
        <h2 class="vissually-hidden">Услуги</h2>
        <ul class="service-list">
          <li
            v-for="(service, key) of services"
            :key="key"
            class="service-list__item service"
          >
            <img
              :src="service.image"
              :alt="service.title"
              class="service__image"
            />
            <h3 class="service__title">{{ service.title }}</h3>
            <p class="service__description">{{ service.description }}</p>
            <a :href="service.link" class="button">{{ service.buttonTitle }}</a>
          </li>
        </ul>
      </section>
      <section class="properties container">
        <h2>Добавлено сегодня</h2>
        <ul class="propeties__list">
          <li
            v-for="(propertie, key) of properties"
            :key="key"
            class="propeties__item property"
          >
            <img
              :src="property.image"
              :alt="property.title"
              class="propery__image"
            />
            <p class="property__description">
              {{ property.description }}
            </p>
            <a :href="propertie.link" class="button"> Просмотреть </a>
          </li>
        </ul>
      </section>
      <section class="cities container">
        <h2>Поиск объявлений по городам</h2>
        <ul class="cities-list">
          <li
            v-for="(city, key) of cities"
            :key="key"
            class="cities-list__item city"
          >
            <a :href="city.link" class="city__link">
              <img :src="city.image" :alt="city.name" class="city__image" />
              <h3 class="city__name">{{ city.name }}</h3>
            </a>
          </li>
        </ul>
      </section>
    </main>
    <footer class="page-footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          title: 'Сдать квартиру',
          description: 'Описание',
          link: '/',
          image: 'static/image/service-add-property.png',
          buttonTitle: 'Подать объявление',
        },
        {
          title: 'Квартиры в аренду',
          description: 'Описание',
          link: '/',
          image: 'static/image/service-find-property.png',
          buttonTitle: 'Найти жилье',
        },
      ],
    }
  },
}
</script>
