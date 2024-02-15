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
console.log(auth.currentUser)
const email = ref('')
const password = ref('')

const submit = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        console.log('User signed in:', user)
    } catch (error) {
        console.error('Error signing in:', error.message)
    }
}

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
