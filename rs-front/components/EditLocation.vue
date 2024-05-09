<template>
    <div>
        <button @click="openDetails = !openDetails" class="button_details">
            Editar
        </button>
        <MobSlider :isActive="openDetails">
            <template v-slot:headerContent>
                <span></span>
                <h1>Editar {{ props.location.localName }} em {{ props.city }}</h1>
                <button @click="openDetails = !openDetails" class="close-button">
                    <img src="/close.png" alt="fechar">
                </button>
            </template>
            <template v-slot:content>
                <section class="content">
                    <h3 class="title">Nome do local:</h3>
                    <button @click="editItem(localName, 'localName')">
                        <input type="text" v-model="localName">
                        <img src="/edit.png" alt="edit">
                    </button>
                    <h3 class="title">Endereço do local:</h3>
                    <button>
                        <input type="text" v-model="localAdress">
                        <img src="/edit.png" alt="edit">
                    </button>
                    <h3 class="title">Necessidade de Voluntários:</h3>
                    <button @click="needVolunteers = !needVolunteers">
                        <h3 :style="{ color: needVolunteers ? '#38c86a' : '#dc4e4e' }"
                            >{{needVolunteers ? "Precisa de Voluntários!" : "Não precisa de Voluntários"}}
                        </h3>
                        <img src="/edit.png" alt="edit">
                    </button>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-left: 1rem;">
                        <p for="volunteers">Tipo de abrigo:</p>
                        <div>
                            <input style="margin-right: .5rem;" type="radio" id="human" name="type" value="human" v-model="typeRadio">
                            <label for="human">Humanos</label><br>
                            <input style="margin-right: .5rem;" type="radio" id="pet" name="type" value="pet" v-model="typeRadio">
                            <label for="pet">Animais</label><br>  
                            <input style="margin-right: .5rem;" type="radio" id="petfriendly" name="type" value="petfriendly" v-model="typeRadio">
                            <label for="petfriendly">Humanos e Animais</label><br><br>
                        </div>
                    </div>
                    <div>
                        <h3 class="title">Clique para editar os itens:</h3>
                        <ul>
                            <div v-for="item in items" :key="item.name">
                                <button class="chip__button" >
                                    <li
                                        @click="chipAction(item)"
                                        class="chip"
                                        :style="{ background: item.urgent ? '#dc4e4e' : '#c8b738', 'font-weight': item.urgent ? 'bold' : 'light' }">

                                        <div v-if="editItems === 'delete'" class="chip__div">
                                            <img src="/delete.png" alt="excluir">
                                        </div>

                                        {{ primeiraLetraMaiuscula(item.name) }}
                                    </li>
                                </button>
                            </div>
                            <div class="addChip" v-if="editItems === 'add'">
                                <input type="text" v-model="newItemName" placeholder="Nome do item">
                                <label>
                                    <input type="checkbox" v-model="newItemUrgent">
                                    Urgente
                                </label>
                            </div>
                        </ul>
                    </div>
                </section>
            </template>
            <template v-slot:bottomContent>
                <div style="width: 100%;">
                    <div class="btns__addDelete">
                        <button class="chip__button" @click="() => {editItems = 'add'; chipAction()}">
                            <li
                                style="background: #5ed25e; font-weight: bold">
                                {{ newItemName ? 'Adicionar item' : 'Criar item'}}
                            </li>
                        </button>
                        <button class="chip__button" @click="editItems = 'delete'">
                            <li
                                style="background: #f44444; font-weight: bold">
                                Deletar item
                            </li>
                        </button>
                    </div>
                    <button @click="editLocation()" class="edit-location-button"
                        style="height: 3rem; margin-top: 2rem;">
                        Terminar edição
                    </button>
                </div>
            </template>
        </MobSlider>
    </div>
</template>

<script setup>
const store = useCitiesStore();
const props = defineProps({
    city: String,
    cityId: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: true,
    }
});

function primeiraLetraMaiuscula(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

const openDetails = ref(false);

const newItemName = ref('');
const newItemUrgent = ref(false);
const editItems = ref("");

const localName = ref(props.location.localName);
const localAdress = ref(props.location.localAdress);
const needVolunteers = ref(props.location.needVolunteers);
const typeRadio = ref(props.location.type);
const items = ref(props.location.items);


const chipAction = (item) => {
    if(editItems.value === 'delete') {
        items.value = items.value.filter(i => i.name !== item.name);
    }
    if(editItems.value === 'add' && newItemName.value) {
        items.value.push({ name: newItemName.value, urgent: newItemUrgent.value, need: true });
        newItemName.value = "";
        newItemUrgent.value = false;
    }
}

async function editLocation() {
    const location = {
        localName: localName.value,
        localAdress: localAdress.value,
        needVolunteers: needVolunteers.value,
        type: typeRadio.value,
        items: items.value
    };

    try {
        const response = await fetch(`http://localhost:3001/api/cities/${props.cityId}/${props.location._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(location)
        });

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        console.log(data);

        // Limpar os campos de entrada da localização
        localName.value = props.location.localName;
        localAdress.value = props.location.localAdress;
        needVolunteers.value = props.location.needVolunteers;
        typeRadio.value = location.type;
        items.value = props.location.items;
        
        openDetails.value = false;
        store.logCities();
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
}
.button_details {
    background: #242424;
    color: whitesmoke;
    font-size: 1rem;
    font-weight: 700;
    border-radius: .5rem;
    padding: .4rem;
    border: 0;
    width: 100%;
}

.close-button {
    border: 0;
    background: 0;
    font-size: 1.5em;
    color: #333;
}

.edit-location-button {
    background: #5ed25e;
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

.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-bottom: 2px solid hsla(0, 0%, 82%, 0.62);
    padding-bottom: 1rem;
}

.content button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.064);
    padding: .5rem 1rem;
    border-radius: 2rem;
}

.content .title {
    margin-left: 1rem;
}
.chip {
    position: relative;
}
.chip__div {
    content: '';
    position: absolute;
    font-weight: bold;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.616);
    border-radius: 2rem;
    top: -8px;
    right: -5px;
}
.chip__div img {
    width: 12px;
}
.chip__button {
    padding: 0 !important;
    border: 0;
    background: none;
    list-style-type: none;
}
.btns__addDelete {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
ul {
    margin-top: 1rem;
    margin-left: 1rem;
}
button input {
    border: none;
    outline: none;
    width: 100%;
}
.addChip {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
}
.addChip input[type="text"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>