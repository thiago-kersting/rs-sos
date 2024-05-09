<template>
  <Container>
    <div class="warn">
      <img src="/warning.png" alt="warn">
      <p>Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações.</p>
    </div>
    <div class="warn">
      <img src="/link.png" alt="warn">
      <p>Aqui você pode encontrar links úteis que podem ajudar.</p>
    </div>
    <div class="search">
      <img src="/magnifying-glass.png" alt="pesquisa">
      <input type="text" placeholder="Buscar por abrigo ou endereço">
    </div>
    <Location :cities="store.cities"/>
  </Container>
</template>

<script setup>
const store = useCitiesStore(); 

onMounted(() => {
  store.logCities()
})

</script>

<style scoped>
.warn {
  display: flex;
  gap: 1rem;
  border: 2px solid hsla(0, 0%, 82%, 0.62);
  border-radius: .5rem;
  padding: 1rem .5rem;
}
.warn img {
  object-fit: contain;
}
.search {
  display: flex;
  border: 2px solid hsla(0, 0%, 82%, 0.62);
  border-radius: .5rem;
  position: relative;
}
.search input {
  width: 100%;
  border: none;
  height: 30px;
  border-radius: .5rem;
  padding-left: 3rem;
  font-size: medium;
}
.search input::placeholder {
  color: #a6a6a6;
}
.search img {
  position: absolute;
  left: 10px;
  top: 2px;
}
</style>