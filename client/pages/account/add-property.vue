<template>
  <div>
    <h2>Add Property</h2>
    <form class="form-property" @submit="createProperty">
      <ul class="form-property__list">
        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Address:</span>
            <input class="field__input" v-model="address" required />
          </label>
        </li>

        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Price:</span>
            <input class="field__input" v-model="price" required />
          </label>
        </li>
        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">City:</span>
            <SelectBox label="Select city" :items="cityList" v-model="cityId" />
          </label>
        </li>
        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Type:</span>
            <SelectBox label="Select type" :items="propertyTypeList" v-model="propertyTypeId" />
          </label>
        </li>
        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Description:</span>
            <textarea
              class="field__input"
              name="description"
              rows="4"
              v-model="description"
              placeholder="tell about real estate"
              aria-label="Description"
              required
            ></textarea>
          </label>
        </li>
      </ul>
      <button class="form-property__button button button--primary button--rounded" type="submit">+ Add Property</button>
    </form>
  </div>
</template>

<script>
import SelectBox from '../../components/UI/SelectBox'
import { CITY_LIST, PROPERTY_TYPE_LIST } from '../../config/index'
export default {
  middleware: ['authenticated'],
  components: {
    SelectBox
  },
  data() {
    return {
      address: '',
      price: '',
      description: '',
      cityList: CITY_LIST,
      propertyTypeList: PROPERTY_TYPE_LIST,
      cityId: null,
      propertyTypeId: null
    }
  },
  methods: {
    createProperty(e) {
      e.preventDefault()
      this.$store.dispatch('property/create', {
        address: this.address,
        price: this.price,
        description: this.description,
        userId: this.$store.state.user.id,
        cityId: this.cityId,
        adType: this.propertyTypeId
      })
    }
  }
}
</script>

<style lang="scss" >
.form-property {
  display: flex;
  flex-direction: column;
  max-width: 70%;

  &__item {
    margin: 10px 0;
  }

  &__list {
    list-style: none;
  }

  &__button {
    justify-self: flex-end;
    align-self: flex-end;
  }
}
</style>
