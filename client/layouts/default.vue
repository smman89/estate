<template>
  <div>
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
