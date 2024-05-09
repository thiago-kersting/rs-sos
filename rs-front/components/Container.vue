<template>
    <main>
        <slot />
    </main>
</template>

<style scoped>
main {
    max-width: 328px;
    margin: 0 auto;
}
@media(min-width: 768px) {
    main {
        max-width: 720px;
    }
}
@media (min-width: 1366px ) {
    main {
        max-width: 1318px;
    }
}
@media (min-width: 1920px) {
    main {
        max-width: 1616px;
    }
}
</style>