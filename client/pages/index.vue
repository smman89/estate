<template>
  <div>
    <PageHeader />
    <main>
      <HeroSection />
      <ServicesSection />
      <PropertiesSection />
      <CitySection />
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
import HeroSection from '../components/Sections/HeroSection'
import ServicesSection from '../components/Sections/ServicesSection'
import PropertiesSection from '../components/Sections/PropertiesSection'
import CitySection from '../components/Sections/CitySection'
import PageFooter from '../components/PageFooter'
export default {
  components: {
    PageHeader,
    HeroSection,
    ServicesSection,
    PropertiesSection,
    CitySection,
    PageFooter,
  },
}
</script>
