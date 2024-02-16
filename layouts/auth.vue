<template>
    <el-button @click="back()">Retour</el-button>
    <slot />
</template>
<script setup>
const router = useRouter()
const back = () => {
    router.push({ path: '/' })
}
</script>
