<template>
    <el-button @click="back()">Retour</el-button>
    <slot />
</template>
<script setup>
const router = useRouter()
const back = () => {
    router.push({ path: '/' })
}

onMounted(() => {
    if (localStorage.getItem('TOKEN')) {
        router.push({ path: '/dashboard' })
    } else {
        router.push({ path: '/' })
    }
})
</script>
