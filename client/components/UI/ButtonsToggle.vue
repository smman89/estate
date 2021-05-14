<template  class="buttons-toggle">
  <ul class="buttons-toggle__list">
    <li class="buttons-toggle__item" v-for="(item, key) in items" :key="key">
      <label :class="`button button--rounded ${selected === item.value ? 'button--primary' : 'button--secondary '}`">
        <img class="button__icon" :src="require('@/assets/img/svg/house.svg')" width="17" height="17" alt="house" />
        {{ item.label }}<input type="radio" :value="item.value" v-model="selected" @input="update"
      /></label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selected: null
    }
  },
  methods: {
    update() {
      this.$emit('change', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
.white {
  background: $grey-200;
}

input[type='radio'] {
  display: none;
}

.buttons-toggle {
  &__list {
    list-style: none;
    padding: 0;
    display: flex;
  }

  &__item {
    margin-right: 16px;
  }
}
</style>
