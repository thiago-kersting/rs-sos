<template>
  <Container>
    <Location :cities="store.cities"/>
  </Container>
</template>

<script setup>
const store = useCitiesStore(); 

onMounted(() => {
  store.logCities()
} )


</script>

<style scoped>

</style>