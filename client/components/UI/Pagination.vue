<template>
  <ul class="pagination__list">
    <li class="pagination__item" v-for="(page, key) in pages" :key="key">
      <button
        :class="`pagination__button ${currentPage === page ? 'pagination__button--selected' : ''}`"
        @click="update(page)"
      >
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  model: {
    prop: 'currentPage',
    event: 'change'
  },
  props: {
    pages: {
      type: Array
    },
    currentPage: {
      type: Number
    }
  },
  methods: {
    update(page) {
      console.log(page)
      this.$emit('change', page)
    }
  }
}
</script>


<style lang="scss" scoped>
.pagination {
  &__list {
    list-style: none;
    display: flex;
    flex-direction: row;
  }

  &__item {
    margin: 8px;
  }

  &__button {
    display: flex;
    cursor: pointer;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 50%;
    font-size: 16px;
    line-height: 24px;

    &--selected {
      background-color: $primary;
      color: white;
    }
  }
}
</style>
