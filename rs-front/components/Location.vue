<template>
    <section>
        <div class="city" v-for="city in cities" :key="city._id">
            <h1>Abrigos disponíveis em {{ city.cityName }} ( {{ city.locations.length }} )</h1>
            <div class="card" v-for="locations in city.locations" :key="locations._id">
                <div class="card__header">
                    <h3>{{ locations.localName }}</h3>
                    <p>{{ locations.localAdress }}</p>
                    <a style="text-decoration: none;" :href="'https://www.google.com/maps/search/?api=1&query=' + locations.localAdress + ' ' + city.cityName" target="_blank">
                        <button style="display: flex; align-items: center; background: none; border: none; color: #242424; font-weight: 700;">
                            <img style="margin-right: .5rem;" src="/map.png" alt="google maps">
                            Clique aqui para pesquisar no maps
                        </button>
                    </a>
                    <div style="display: flex; gap: .5rem; align-items: center;">
                        <img v-if="locations.type === 'petfriendly'" src="/pet-friendly.png" alt="petfriendly">
                        <img v-if="locations.type === 'pet'" src="/animal.png" alt="animal">
                        <img v-if="locations.type === 'human'" src="/no-animal.png" alt="animal">
                        <h4 style="color: rgb(78 122 220)">
                            {{ locations.type === 'human' ? 'Não aceita animais' : locations.type === 'pet' ? 'Só aceita animais' : locations.type === 'petfriendly' ? 'Aceita humanos e animais' : ''}}
                        </h4>
                    </div>
                    <h4 :style="{color: locations.needVolunteers ? '#38c86a' : '#dc4e4e'}">{{ locations.needVolunteers ? "Precisa de Voluntários!" : "Não precisa de Voluntários" }}</h4>
                </div>
                <h4 v-if="locations.items.length > 0">Precisa com urgência:</h4>
                <ul>
                    <li v-for="items in locations.items" :key="items._id" :style="{ background: '#dc4e4e', 'font-weight' : 'bold',  display: items.urgent ? 'flex' : 'none'}">
                        {{ primeiraLetraMaiuscula(items.name)}}
                    </li>
                </ul>
                <EditLocation v-if="permission" :location="locations" :city="city.cityName" :cityId="city._id"/>
                <p class="date">Atualizado por último {{ formatarDataHora(locations.updatedAt) }}</p>
            </div>
            <CreateLocation :city="city.cityName" :cityId="city._id"/>
        </div>
    </section>
</template>

<script setup>
defineProps({
    cities: {
        type: Array,
        required: true,
    }
})

const permission = ref(false);

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

</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 5rem;
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
    width: 100%;
    transition: .3s ease-out;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid hsla(0, 0%, 82%, 0.62);
    border-radius: .5rem;
}
.card:hover {
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.171);
}
.card__header {
    border-bottom: 2px solid hsla(0, 0%, 82%, 0.62);
    padding-bottom: 1rem;

    display: flex;
    flex-direction: column;
    gap: .4rem;
}
.card ul {
    list-style-type: none;
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
}
li {
    width: max-content;
    padding: .2rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    color: #ffffff;
    background: #b0a130;
}
.date {
    font-size: 12px;
    text-align: end;
    color: #434343;
}
</style>