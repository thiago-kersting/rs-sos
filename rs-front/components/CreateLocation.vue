<template>
    <section style="width: 100%;">
        <button @click="modalOpen = true" class="add-location-button">
            <h1>+ Adicionar Localização</h1>
        </button>
        <MobSlider :isActive="modalOpen">
            <template v-slot:headerContent>
                <span></span>
                <h1>Criar abrigo em {{ props.city }}</h1>
                <button @click="modalOpen = !modalOpen" class="close-button">
                    <img src="/close.png" alt="fechar">
                </button>
            </template>
            <template v-slot:content>
                <label for="name">Digite o nome do abrigo:</label>
                <input v-model="localName" id="name" type="text" placeholder="Digite o nome da localização" required class="input-field">
                <label for="loc">Digite o endereço:</label>
                <input v-model="localAdress" id="loc" type="text" placeholder="Endereço da localização" required class="input-field">
                <div style="display: flex; gap: 1rem; align-items: center; margin: 10px 0 20px;">
                    <label for="volunteers">Precisa de voluntários?</label>
                    <input v-model="needVolunteers" id="volunteers" type="checkbox">
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; margin: 10px 0 20px;">
                    <p for="volunteers">Tipo de abrigo:</p>
                    <div>
                        <input style="margin-right: .5rem;" type="radio" id="human" name="type" value="human" v-model="type">
                        <label for="human">Humanos</label><br>
                        <input style="margin-right: .5rem;" type="radio" id="pet" name="type" value="pet" v-model="type">
                        <label for="pet">Animais</label><br>  
                        <input style="margin-right: .5rem;" type="radio" id="petfriendly" name="type" value="petfriendly" v-model="type">
                        <label for="petfriendly">Humanos e Animais</label><br><br>
                    </div>
                </div>
                <label for="volunteers">Precisa de algum item?</label>
                <input v-model="itemName" type="text" placeholder="Nome do item" class="input-field">
                <p style="font-size: 12px;">*Opcional</p>
                <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem;">
                    <label for="urgent">É urgente?</label>
                    <input id="urgent" v-model="itemUrgent" type="checkbox" placeholder="Urgente">
                </div>
                <div style="margin-top: 1rem;">
                    <ul>
                        <li v-for="item in items" :key="item.name" :style="{ background: item.urgent ? '#dc4e4e' : '#c8b738', 'font-weight': items.urgent ? 'bold' : 'light' }">
                            {{ primeiraLetraMaiuscula(item.name) }}
                        </li>
                    </ul>
                </div>
                <button @click="addItem" class="add-location-button" style="height: 3rem; width: 50%; margin: .5rem 0; margin-left: auto;">Adicionar item</button>
            </template>
            <template v-slot:bottomContent>
                <button @click="addLocation" class="add-location-button" style="height: 3rem; margin-top: 2rem;">+ Adicionar</button>
            </template>
        </MobSlider>
    </section>
</template>

<script setup>
function primeiraLetraMaiuscula(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

const store = useCitiesStore(); 
const props = defineProps({
    city: String,
    cityId: {
        type: String,
        required: true,
    }
})
const modalOpen = ref(false);

const localName = ref('');
const localAdress = ref('');
const needVolunteers = ref(false);
const type = ref('');

const items = ref([]);

const itemName = ref('');
const itemUrgent = ref(true);

function addItem() {
    if(itemName.value) {
        items.value.push({
        name: itemName.value,
        urgent: itemUrgent.value,
        need: true,
        });
    }
    
    // Limpar os campos de entrada do item
    itemName.value = '';
    itemUrgent.value = false;
}

async function addLocation() {
    const location = {
        localName: localName.value,
        localAdress: localAdress.value,
        needVolunteers: needVolunteers.value,
        type: type.value,
        items: items.value
    };


    try {
        const response = await fetch(`http://localhost:3001/api/cities/${props.cityId}/locations`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(location)
        });

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        console.log(data);

        // Limpar os campos de entrada da localização
        localName.value = '';
        localAdress.value = '';
        type.value = '';
        needVolunteers.value = false;
        items.value = [];
        
        modalOpen.value = false;
        store.logCities();
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
.add-location-button {
    background: rgb(94, 210, 94);
    color: white;
    border: none;
    width: 100%;
    height: 100px;
    border-radius: 1rem;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button {
    border: 0; 
    background: 0; 
    font-size: 1.5em;
    color: #333;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}
ul {
    list-style-type: none;
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
}
li {
    background: #2c2828;
    width: max-content;
    padding: .5rem;
    border-radius: 2rem;
    font-size: 1rem;
    color: white;
    display: flex;
    gap: 1rem;
}
</style>
