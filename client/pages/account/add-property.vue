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
            <span class="field__label">Description:</span>
            <textarea
              class="field__input"
              name="description"
              rows="4"
              v-model="description"
              placeholder="tell about real estate"
              aria-label="Description"
            ></textarea>
          </label>
        </li>
      </ul>
      <button class="form-property__button button button--primary button--rounded" type="submit">+ Add Property</button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],

  data() {
    return {
      address: '',
      price: '',
      description: ''
    }
  },
  methods: {
    createProperty() {
      this.$store.dispatch('property/create', {
        address: this.address,
        price: this.price,
        description: this.description
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
