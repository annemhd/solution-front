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

const success = () => {
    ElMessage({
        message: 'Le mail de reinitialisation a bien été envoyé',
        type: 'success',
    })
}

const error = () => {
    ElMessage({
        message: "Une erreur s'est produite",
        type: 'error',
    })
}

const handleForgotPassword = async () => {
    try {
        await sendPasswordResetEmail(auth, email.value)
        router.push({ path: '/signin' })
        success()
    } catch (error) {
        console.error('Le mail pour reinitialiser:', error.message)
    }
}
</script>
