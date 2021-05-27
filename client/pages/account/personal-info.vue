<template>
  <div>
    <h2>Personal Info</h2>
    <form class="form-property" @submit="save">
      <ul class="form-property__list">
        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Fullname:</span>
            <input class="field__input" v-model="fullname" required />
          </label>
        </li>

        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Phone:</span>
            <input class="field__input" v-model="phone" required />
          </label>
        </li>

        <li class="form-property__item">
          <label class="field__block">
            <span class="field__label">Email:</span>
            <input class="field__input" v-model="email" required />
          </label>
        </li>
      </ul>
      <button class="form-property__button button button--primary button--rounded" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      fullname: '',
      phone: '',
      email: ''
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.$store.dispatch('user/edit', {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        id: this.$store.state.user.id
      })
    }
  },
  mounted() {
    this.fullname = this.$store.state.user.fullname
    this.phone = this.$store.state.user.phone
    this.email = this.$store.state.user.email
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
