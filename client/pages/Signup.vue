<template>
  <main class="page-signup container">
    <form class="form" @submit="signup">
      <ul class="signup-list">
        <li class="signup-list__item field">
          <label class="field__label">
            <span>Email:</span>
            <input class="field__input" type="email" name="email" required />
          </label>
        </li>
        <li class="signup-list__item field">
          <label class="field__label">
            <span>Username:</span>
            <input class="field__input" type="text" name="username" required />
          </label>
        </li>
        <li class="signup-list__item field">
          <label class="field__label">
            <span>Password:</span>
            <input class="field__input" type="password" name="password" required />
          </label>
        </li>
      </ul>
      <button type="submit" class="button button--primary button--rounded">Signup</button>
    </form>
  </main>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {}
  },
  methods: {
    signup() {
      this.$store.dispath('User/signup', {
        email: this.email,
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.page-signup {
  display: flex;
  justify-content: center;
}

.signup-list {
  list-style: none;
  padding: 0;
  &__item {
    margin-top: 16px;
  }
}
</style>
