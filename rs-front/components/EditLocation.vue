<template>
    <div>
        <button @click="openDetails = !openDetails" class="button_details">
            + Detalhes
        </button>
        <MobSlider :isActive="openDetails">
            <template v-slot:headerContent>
                <span></span>
                <h1>Criar abrigo em {{ props.city }}</h1>
                <button @click="openDetails = !openDetails" class="close-button">
                    X
                </button>
            </template>
        </MobSlider>
    </div>
</template>

<script setup>
const props = defineProps({
    city: String,
    cityId: {
        type: String,
        required: true,
    }
});

const openDetails = ref(false);
</script>

<style scoped>
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
</style>