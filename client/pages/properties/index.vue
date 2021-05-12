<template>
  <div>
    <main class="page-properties container-properties">
      <h1 class="page-properties__title">Объявления</h1>
      <section class="filter">Фильтр</section>
      <section class="properties">
        <h2 class="properties__title">Объявления об аренде</h2>

        <div class="properties__tools">
          <div class="properties__sort">Сортировать:</div>
          <div class="properties__count">{{ propertiesCount }} объявлений</div>
        </div>
        <ul class="properties__list">
          <li class="properties__item" v-for="(property, key) in properties" :key="key">
            <img :src="property.images[0]" alt="" class="properties__image" />
            <p class="properties__description">Description</p>
          </li>
        </ul>

        <ul class="pages-list">
          <li class="pages-list__item" v-for="(page, key) in pages" :key="key">
            <button @click="currentPage = page" type="button">
              {{ page }}
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      limit: 12,
      skip: 0
    }
  },
  computed: {
    properties() {
      return this.$store.state.property.list
    },
    propertiesCount() {
      return this.$store.state.property.count
    },
    pages() {
      const pagesLength = this.propertiesCount / this.limit
      return Array.from({ length: pagesLength }, (_, i) => i + 1)
    }
  },
  methods: {
    load() {
      this.$store.dispatch('property/list', {
        limit: this.limit,
        skip: (this.currentPage - 1) * this.limit
      })
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    currentPage: function () {
      this.load()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-properties {
  width: 100%;
  margin: 0 auto;
  min-width: 320px;
  padding: 0 20px;

  @media (min-width: $desktop-width) {
    max-width: 1824px;
    padding: 0 110px;
  }
}

.page-properties {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
.filter {
  grid-column: 1/4;
}

.properties {
  grid-column: 4/-1;

  display: flex;
  flex-direction: column;

  &__list {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 24px;
    list-style: none;
  }

  &__item {
    grid-column: span 3;
    min-height: 400px;
    box-shadow: 0px 2px 2px -2px rgba(31, 27, 45, 0.08), 0px 4px 12px rgba(31, 27, 45, 0.08);
    border-radius: 12px;
  }

  &__image {
    width: 100%;
    border-radius: 12px;
  }

  &__tools {
    display: flex;
    justify-content: space-between;
  }
}

.pages-list {
  list-style: none;
  display: flex;
  flex-direction: row;

  &__item {
    margin: 8px;
  }
}
</style>
