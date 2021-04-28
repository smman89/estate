<template>
  <section class="properties container">
    <h2 class="properties__header">Добавлено сегодня</h2>
    <a href="#" class="properties__link">Просмотреть все</a>
    <ul class="propeties__list">
      <li
        v-for="(property, key) of properties"
        :key="key"
        class="properties__item"
        :style="`background-image: url(${require(`@/assets/img/property/${property.image}`)})`"
      >
        <a :href="property.link" class="properties__title">
          {{ property.title }}
        </a>
        <p class="properties__address">
          {{ property.address }}
        </p>
        <a href="" class="properties__price button">{{ property.price }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      properties: [
        {
          title: 'Title',
          description: 'description',
          address: 'address',
          price: '100',
          id: 1,
          image: 'property-1.png',
        },
        {
          title: 'Title',
          description: 'description',
          address: 'address',
          price: '100',
          id: 2,
          image: 'property-2.png',
        },
        {
          title: 'Title',
          description: 'description',
          address: 'address',
          price: '200',
          id: 3,
          image: 'property-3.png',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.properties {
  display: grid;
  grid-template-areas:
    'header link'
    'properties properties';

  justify-content: space-between;
  align-items: center;
  margin-bottom: 107px;
}

.properties__header {
  margin: 0;
  grid-area: header;
  font-size: 28px;
  line-height: 36px;
  font-family: $font-family--noto-sans;
  color: $primaryBlack;
  font-weight: 700;
}
.propeties__list {
  grid-area: properties;
  list-style: none;
  display: grid;
  grid-template-areas:
    'one two'
    'one three';
  column-gap: 24px;
  row-gap: 30px;
  padding: 0;
}

.properties__item {
  position: relative;
  background-image: url();
  padding: 20px;
  padding-top: 100px;
  justify-content: space-between;
  align-items: flex-end;
  display: grid;
  grid-template-areas:
    'title price'
    'address price';

  &:nth-child(1) {
    grid-area: one;
  }

  &:nth-child(2) {
    grid-area: two;
    min-height: 200px;
  }

  &:nth-child(3) {
    grid-area: three;
    min-height: 200px;
  }

  .properties__title {
    grid-area: title;
    font-family: $font-family--noto-sans;
    color: white;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
  }
  .properties__address {
    grid-area: address;
    font-family: $font-family--noto-sans;
    color: white;
    font-size: 14px;
    line-height: 21px;
  }
  .properties__price {
    grid-area: price;
    display: block;
    height: fit-content;
  }

  .properties__link {
    grid-area: link;

    font-size: 16px;
    line-height: 24px;
    color: $primaryGrey;
    text-decoration: none;
  }
}
</style>
