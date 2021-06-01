<template>
  <main class="page-properties container-properties">
    <section class="filter">
      <ButtonsToggle :items="propertyTypeList" v-model="propertyType" />
      <SelectBox placeholder="Select city" label="Location" :items="cityList" v-model="cityId" />
    </section>
    <section class="properties">
      <h1 class="properties__title">Объявления об аренде</h1>

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
      <Pagination :pages="pages" v-model="currentPage" />
    </section>
  </main>
</template>

<script>
import SelectBox from '../../components/UI/SelectBox'
import ButtonsToggle from '../../components/UI/ButtonsToggle'
import Pagination from '../../components/UI/Pagination'
import { CITY_LIST, PROPERTY_TYPE_LIST } from '../../config'
export default {
  components: {
    SelectBox,
    ButtonsToggle,
    Pagination
  },
  data() {
    return {
      propertyTypes: [
        { label: 'For rent', value: 0 },
        { label: 'For sale', value: 1 }
      ],
      cityList: CITY_LIST,
      propertyTypeList: PROPERTY_TYPE_LIST,
      cityId: 1,
      propertyType: 0,
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
        skip: (this.currentPage - 1) * this.limit,
        where: {
          and: [{ adType: this.propertyType }, { cityId: this.cityId }]
        }
      })
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    currentPage: function () {
      this.load()
    },
    propertyType: function () {
      this.load()
    },
    cityId: function () {
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
  justify-self: flex-start;
  align-self: flex-start;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
.filter {
  grid-column: 1/4;
  height: 500px;
}

.properties {
  grid-column: 4/-1;

  display: flex;
  flex-direction: column;

  &__list {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
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
</style>
