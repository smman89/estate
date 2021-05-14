<template >
  <select label="Select city" class="select-box" v-model="selected" @change="update">
    <option value="" disabled selected hidden>Select city</option>
    <option v-for="(item, key) in items" :key="key" :value="item.value">{{ item.label }}</option>
  </select>
</template>


<script>
export default {
  name: 'select-box',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    items: {
      type: Array
    },
    value: {
      type: String | Number
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    update() {
      this.$emit('change', this.selected)
    }
  }
}
</script>

<style lang="scss" >
.select-box {
  border: 1px solid $grey-400;
  border-radius: 8px;
  padding: 10px 10px 10px 18px;
  outline: none;
  width: 100%;
  font-family: Noto Sans;
  font-size: 16px;
  line-height: 150%;
  position: relative;

  &::before {
    position: absolute;
    right: 20px;
    border: 2px solid $grey-800;
    border-width: 0 2px 2px 0;
    display: inline-block;
    transform: rotate(45deg);
    margin-top: 5px;
    margin-right: 20px;
  }
}
</style>
