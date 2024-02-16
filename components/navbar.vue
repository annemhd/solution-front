<template>
    <el-menu
        :default-active="defaultActive"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
    >
        <el-menu-item :index="index[0]">Boutique</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item v-if="!logged" :index="index[1]">Connexion</el-menu-item>
        <el-menu-item v-if="!logged" :index="index[2]">Inscription</el-menu-item>
        <el-menu-item v-if="logged" :index="index[3]">Mon compte</el-menu-item>
        <el-menu-item v-if="logged" :index="index[4]">Panier</el-menu-item>
    </el-menu>
</template>
<script setup>
const TOKEN = localStorage.getItem('TOKEN')

const logged = computed(() => {
    return TOKEN ?? false
})

// console.log(logged)

const router = useRouter()
const index = ref(['/', '/signin', '/signup', '/dashboard', '/cart'])

const defaultActive = computed(() => {
    switch (router.currentRoute.value.path) {
        case '/':
            return index.value[0]
        case '/signin':
            return index.value[1]
        case '/signup':
            return index.value[2]
        case '/dashboard':
            return index.value[3]
        case '/cart':
            return index.value[4]
        default:
            return index.value[0]
    }
})
</script>
