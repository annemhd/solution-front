<template>
    <el-input v-model="email" placeholder="Email" />
    <a href="/signin">
        <el-button type="primary" text>Annuler</el-button>
    </a>
    <el-button @click.prevent="handleForgotPassword()">Envoyer</el-button>
</template>
<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.config.js'
import { sendPasswordResetEmail } from 'firebase/auth'

const router = useRouter()
const email = ref('')

const handleForgotPassword = async () => {
    try {
        await sendPasswordResetEmail(auth, email.value)
        router.push({ path: '/signin' })
        ElMessage({
            message: 'Le mail de reinitialisation a bien été envoyé',
            type: 'success',
        })
    } catch (error) {
        ElMessage({
            message: "Une erreur s'est produite : " + error.message,
            type: 'error',
        })
    }
}
</script>
