<template>
    <header></header>
    <nav>
        <navbar />
    </nav>
    <main>
        <slot />
    </main>
    <footer>footer</footer>
</template>
<script setup>
import navbar from '~/components/navbar.vue'
</script>
