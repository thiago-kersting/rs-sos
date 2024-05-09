<template>
  <div v-for="city in cities" :key="city._id">
    <h1>{{ city.cityName }}</h1>
    <div v-for="locations in city.locations" :key="locations._id">
      <p>{{ locations.localName }}</p>
        <ul v-for="items in locations.items" :key="items._id">
          <li>{{ items.name }}</li>
          <p>{{ items.type }}</p>
          <p>{{ items.quantity }}</p>
          <p>{{ items.need ? "Precisa desse item" : "não Necessita no momento"}}</p>
        </ul>
    </div>
  </div>
</template>

<script setup>
const cities = ref([])

async function logCities() {
  const response = await fetch("http://localhost:3001/api/cities");
  const citiesResponse = await response.json();
  cities.value = citiesResponse;
  console.log(citiesResponse);
}

onMounted(() => {
  logCities();
});
</script>

<style scoped>

</style>