export const useCitiesStore = defineStore('cities', () => {
    const cities = ref([]);
    async function logCities() {
        const response = await fetch("http://localhost:3001/api/cities");
        const citiesResponse = await response.json();
        cities.value = citiesResponse;
        console.log(citiesResponse);
        console.log(cities.value)
    }
    return { cities, logCities };
  })