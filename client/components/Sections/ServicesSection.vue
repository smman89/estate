<template>
  <section class="services container">
    <h2 class="visually-hidden">Услуги</h2>
    <ul class="services__list">
      <li v-for="(service, key) of services" :key="key" class="services__item">
        <img
          :src="require(`@/assets/img/${service.image}`)"
          :alt="service.title"
          class="services__image"
        />
        <h3 class="services__title">{{ service.title }}</h3>
        <p class="services__description">{{ service.description }}</p>
        <a :href="service.link" class="button">{{ service.buttonTitle }}</a>
      </li>
    </ul>
  </section>
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
          image: 'service-add-property.png',
          buttonTitle: 'Подать объявление',
        },
        {
          title: 'Квартиры в аренду',
          description: 'Описание',
          link: '/',
          image: 'service-find-property.png',
          buttonTitle: 'Найти жилье',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.services {
  margin: 20px auto;

  &__list {
    display: flex;
    justify-content: space-around;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 416px;
    min-height: 447px;
    align-items: center;

    &:hover {
      box-shadow: 0px 2px 2px -2px rgba(31, 27, 45, 0.08),
        0px 4px 12px rgba(31, 27, 45, 0.08);
      border-radius: 12px;
      padding-top: 24px;
      padding-bottom: 31px;
    }
  }

  &__title {
    font-family: $font-family--noto-sans;
    font-weight: 700;
    font-size: 24px;
    line-height: 130%;
  }
  &__description {
    font-family: $font-family--noto-sans;
    font-size: 14px;
    line-height: 150%;
  }
}
</style>
