<template>
    <header>
        <img src="/sos.gif" class="logo" alt="gif"/>
        <img src="/logosecretaria.png" class="logo" alt="logo rio grande do sul">
        <span class="space"></span>
    </header>
    <div style="padding-bottom: 82px;"></div>
</template>

<script>

</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.171);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background: #fff;
}
.logo {
    max-height: 50px;
    object-fit: cover;
}
@media (max-width: 767px) {
    .space {
        display: none;
    }
}
</style>