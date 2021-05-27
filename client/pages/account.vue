<template>
  <main class="page-account container">
    <div class="account-info">
      <img
        :src="require('@/assets/img/png/avatar.png')"
        alt="avatar"
        class="account__avatar"
        width="48px"
        height="48px"
      />
      <p class="account__fullname">{{ user.fullname }}</p>
      <span class="account__phone">{{ user.phone }}</span>
      <span class="account__email">{{ user.email }}</span>
    </div>
    <nav class="account-nav">
      <ul class="account-nav__list">
        <li class="account-nav__item" v-for="(item, key) of navigationList" :key="key">
          <NuxtLink class="account-nav__text" :to="item.route">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <section class="account-section">
      <NuxtChild />
    </section>
  </main>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      navigationList: [
        { label: 'Personal Info', icon: 'person', route: '/account/personal-info' },
        { label: 'Password & Security', icon: 'password', route: '/account/password-and-security' },
        { label: 'My Listings', icon: 'list', route: '/account/my-properties' },
        { label: 'Logout', icon: 'list', route: '/logout' }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" >
.account-info {
  grid-area: account-info;
  display: grid;
  grid-template-areas:
    'avatar fullname'
    'avatar phone'
    'avatar email';
  column-gap: 8px;
}

.account {
  &__avatar {
    grid-area: avatar;
  }
  &__phone {
    grid-area: phone;
  }
  &__email {
    grid-area: email;
  }
  &__fullname {
    grid-area: fullname;
    font-family: $font-family--noto-sans;
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    color: $grey-900;
  }
}

.page-account {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'account-info account-section'
    'account-nav account-section';
  grid-template-rows: auto 1fr;
  gap: 40px;
}

.account-button {
  grid-area: account-button;
}

.account-section {
  grid-area: account-section;
}

.account-nav {
  grid-area: account-nav;
  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    border-left: 2px solid $primary;
    padding: 20px;
  }

  &__text {
    text-decoration: none;
  }
}
</style>
