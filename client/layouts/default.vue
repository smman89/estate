<template >
  <div class="layout">
    <PageHeader />
    <Nuxt />
    <PageFooter />
  </div>
</template>


<script>
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'

export default {
  name: 'DefaultLayout',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style lang="scss" >
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
