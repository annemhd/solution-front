<template>
    <el-card class="box-card">
        <el-input v-model="email" placeholder="Email" />
        <el-input v-model="password" placeholder="Mot de passe" />
        <el-button>Se connecter</el-button>
        <a href="/signup">
            <el-button type="primary" text>S'inscrire</el-button>
        </a>
        <a href="/forgotpassword">
            <el-button type="primary" text>Mot de passe oublié ?</el-button>
        </a>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
