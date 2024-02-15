<template>
    <el-card class="box-card">
        <el-input v-model="email" placeholder="Email" />
        <el-input v-model="password" placeholder="Mot de passe" type="password" show-password />
        <el-button @click.prevent="submit()">Se connecter</el-button>
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
import { auth } from '../firebase.config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')

const submit = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        console.log(user)
        const data = {
            uid: user.reloadUserInfo.localId,
            email: user.reloadUserInfo.email,
            createdAt: user.reloadUserInfo.lastLoginAt,
            lastLoginAt: user.reloadUserInfo.lastLoginAt,
        }

        localStorage.setItem('TOKEN', JSON.stringify(user.accessToken))
        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        console.error('Erreur de connexion :', error.message)
    }
}

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
