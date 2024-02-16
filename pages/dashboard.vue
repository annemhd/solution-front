<template>
    <div>Dashboard</div>
    <el-button @click="logout()">Déconnexion</el-button>
</template>
<script setup>
const router = useRouter()

const logout = () => {
    localStorage.clear()
    router.push({ path: '/' })
}
</script>
