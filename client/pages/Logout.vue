<template></template>
<script>
export default {
  middleware: ['authenticated'],
  mounted() {
    this.$store.dispatch('user/logout')
  }
}
</script>
