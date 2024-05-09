<template>
    <footer>
        <div>
            <h4>Contact: Thiago Kersting Puls</h4>
            <h5>55 51 996774146</h5>
        </div>
        <a href="https://www.linkedin.com/in/thiago-kersting/" target="_blank">
            <img src="/linkedin.png" alt="github logo">
        </a>
        <a href="https://github.com/thiago-kersting/" target="_blank">
            <img src="/github.png" alt="github logo">
        </a>
    </footer>
</template>

<script>

</script>

<style scoped>
footer {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    box-shadow: 8px 8px 30px 0px rgba(157, 43, 43, 0.394);
    width: 100%;
    position: relative;
    bottom: 0;
    margin-top: 3rem;
    justify-content: space-between;
    align-items: flex-start;
}
a {
    font-size: 0;
}
.logo {
    max-height: 50px;
    object-fit: cover;
}
</style>