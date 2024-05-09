<template>
    <section>
        <div class="city" v-for="city in cities" :key="city._id">
            <h1>{{ city.cityName }}</h1>
            <div class="card" v-for="locations in city.locations" :key="locations._id">
                <div>
                    <h3>{{ locations.localName }}</h3>
                    <h4 style="margin: .5rem 0 1rem;">- {{ locations.localAdress }}</h4>
                    <a style="text-decoration: none;" :href="'https://www.google.com/maps/search/?api=1&query=' + locations.localAdress + ' ' + city.cityName" target="_blank">
                        <button style="display: flex; align-items: center; background: none; border: none; color: #242424; font-weight: 700;">
                            <img style="margin-right: .5rem;" src="/map.png" alt="google maps">
                            Clique aqui para pesquisar no maps
                        </button>
                    </a>
                </div>
                <h4 :style="{color: locations.needVolunteers ? '#38c86a' : '#dc4e4e'}">{{ locations.needVolunteers ? "Precisa de Voluntários!" : "Não precisa de Voluntários" }}</h4>
                <h4 v-if="locations.items.length > 0">Itens Necessitados:</h4>
                <ul>
                    <div v-for="items in locations.items" :key="items._id">
                        <li :style="{ background: items.quantity > 30 ? '#dc4e4e' : '#c8b738', 'font-weight': items.quantity > 30 ? 'bold' : 'light' }">
                            {{ primeiraLetraMaiuscula(items.name) }}
                        </li>
                    </div>
                </ul>
                <EditLocation :city="city.cityName" :cityId="city._id"/>
                <p class="date">Atualizado por último {{ formatarDataHora(city.updatedAt) }}</p>
            </div>
            <CreateLocation :city="city.cityName" :cityId="city._id"/>
        </div>
    </section>
</template>

<script setup>
function primeiraLetraMaiuscula(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

function formatarDataHora(data) {
    const date = new Date(data);
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false, 
        timeZone: 'America/Sao_Paulo' 
    };
    return date.toLocaleString('pt-BR', options);
}

defineProps({
    cities: {
        type: Array,
        required: true,
    }
})
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-top: 2rem;
    align-items: flex-start;
}

.city {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.city > h1 {
    color: #242424;
}

.card {
    background: rgb(255, 255, 255);
    width: 100%;
    transition: .3s ease-out;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.card:hover {
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.171);
}
.card ul {
    list-style-type: none;
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
}
li {
    width: max-content;
    padding: .5rem;
    border-radius: 2rem;
    font-size: 1rem;
    color: #ffffff;
    display: flex;
    gap: 1rem;
    background: #b0a130;
}
.date {
    font-size: 12px;
    text-align: end;
    color: #434343;
}
</style>