<template>
    <section class="noActive" :class="{'isActive': isActive}">
        <section style="width: 100%">
            <header style="width: 100%;">
                <slot name="headerContent"/>
            </header>
            <slot name="content"/>
        </section>
        <slot name="bottomContent"/>
    </section>
</template>

<script setup>
defineProps({
    isActive: {
        type: Boolean,
        default: false
    },
    titleColor: {
        type: String,
        default: 'var(--secondary_00-color)'
    }
})
</script>

<style scoped>
.noActive {
    padding: 1rem 1rem 4rem 1rem;
    background: #FFF;
    width: 100%;
    height: 100vh;
    z-index: 999;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: transform .3s ease-out;
    overflow-y: auto;
}
.isActive {
    transform: translateX(0) !important;
}
header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    width: 100%;
}
</style>