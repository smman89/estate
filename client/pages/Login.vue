<template>
  <main class="page-login container">
    <form class="page-login__form form" @submit="login">
      <ul class="form__list">
        <li class="form__item field">
          <label class="field__block">
            <span class="field__label">Username:</span>
            <input class="field__input" v-model="username" type="text" required />
          </label>
        </li>
        <li class="form__item field">
          <label class="field__block">
            <span class="field__label">Password:</span>
            <input class="field__input" v-model="password" type="password" name="password" required />
          </label>
        </li>
      </ul>

      <button type="submit" class="button button--rounded button--primary">Login</button>
    </form>
  </main>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      try {
        await this.$store.dispatch('user/login', {
          username: this.username,
          password: this.password
        })
        this.$router.push('/properties')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>


<style lang="scss" >
.page-login {
  display: flex;
  justify-content: center;

  &__form {
    margin-top: 25%;
  }
}
</style>
