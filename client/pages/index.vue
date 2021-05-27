<template>
  <main>
    <HeroSection />
    <ServicesSection />
    <PropertiesSection />
    <CitySection />
  </main>
</template>

<script>
import HeroSection from '../components/Sections/HeroSection'
import ServicesSection from '../components/Sections/ServicesSection'
import PropertiesSection from '../components/Sections/PropertiesSection'
import CitySection from '../components/Sections/CitySection'
export default {
  components: {
    HeroSection,
    ServicesSection,
    PropertiesSection,
    CitySection
  }
}
</script>
