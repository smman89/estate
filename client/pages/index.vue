<template>
  <div>
    <PageHeader />
    <main>
      <HeroSection />
      <ServicesSection />
      <!-- <PropertiesSection /> -->

      <section class="cities container">
        <h2>Поиск объявлений по городам</h2>
        <ul class="cities-list">
          <li
            v-for="(city, key) of cities"
            :key="key"
            class="cities-list__item city"
          >
            <a :href="city.link" class="city__link">
              <img
                :src="require(`@/assets/img/${city.image}`)"
                :alt="city.name"
                class="city__image"
              />
              <h3 class="city__name">{{ city.name }}</h3>
            </a>
          </li>
        </ul>
      </section>
    </main>
    <footer class="page-footer"></footer>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
import HeroSection from '../components/Sections/HeroSection'
import ServicesSection from '../components/Sections/ServicesSection'
// import PropertiesSection from '../components/Sections/PropertiesSection'
export default {
  components: {
    PageHeader,
    HeroSection,
    ServicesSection,
    // PropertiesSection,
  },
  data() {
    return {
      cities: [
        { name: 'Москва', image: 'moscow.jpg', url: '' },
        { name: 'Санкт-Петербург', image: 'spb.jpg', url: '' },
        { name: 'Новосибирск', image: 'novosibirsk.jpg', url: '' },
        { name: 'Краснодар', image: 'krasnodar.jpg', url: '' },
      ],
    }
  },
}
</script>
