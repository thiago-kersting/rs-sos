<template>
    <header>
        <h3>SOS Rio Grande do Sul</h3>
        <button @click="store.logCities()">
            <img src="/reload.png" alt="">
        </button>
    </header>
    <div style="padding-bottom: 82px;"></div>
</template>

<script setup>
const store = useCitiesStore();
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.171);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background: #f44444;
    color: white;
}
button {
    background: hsla(0, 0%, 90%, 0.283);
    padding: .375rem;
    font-size: 0;
    border: none;
    border-radius: 6px;
}
@media (max-width: 767px) {
    .space {
        display: none;
    }
}
</style>