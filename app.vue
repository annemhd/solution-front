<template>
    <client-only>
        <div class="m-4">
            <NuxtLayout :name="layout">
                <NuxtPage />
            </NuxtLayout>
        </div>
    </client-only>
</template>
<script setup>
const route = useRoute()

const layout = computed(() => {
    if (route.name === 'signin' || route.name === 'signup') {
        return 'auth'
    } else if (route.name === 'dashboard') {
        return 'dashboard'
    } else {
        return 'default'
    }
})

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
