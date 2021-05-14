<template>
  <main class="page-login container">
    <form class="form" @submit="login">
      <ul class="login-list">
        <li class="login-list__item field">
          <label class="field__label">
            <span>Username:</span>
            <input class="field__input" v-model="username" type="text" required />
          </label>
        </li>
        <li class="login-list__item field">
          <label class="field__label">
            <span>Password:</span>
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


<style lang="scss" scoped>
.page-login {
  display: flex;
  justify-content: center;
}

.login-list {
  list-style: none;
  padding: 0;
  &__item {
    margin-top: 16px;
  }
}
</style>
