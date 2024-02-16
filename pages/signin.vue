<template>
    <el-card class="box-card">
        <el-input v-model="email" placeholder="Email" />
        <el-input v-model="password" placeholder="Mot de passe" type="password" show-password />
        <el-button :disabled="disabled" @click.prevent="submit()">Se connecter</el-button>
        <a href="/signup">
            <el-button type="primary" text>S'inscrire</el-button>
        </a>
        <a href="/forgotpassword">
            <el-button type="primary" text>Mot de passe oublié ?</el-button>
        </a>
        <el-alert v-if="errorsAlert" title="error alert" type="error">
            <ul class="list-disc list-inside">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </el-alert>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})

definePageMeta({
    layout: 'auth',
})

const email = ref('')
const password = ref('')
const router = useRouter()
const errors = ref([])
const errorsAlert = computed(() => {
    return errors.value.length !== 0
})
const disabled = computed(() => {
    email.value && password.value !== ''
})

const validEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

const submit = async () => {
    errors.value = []
    !email.value ? errors.value.push('Saisis ton email') : null
    !validEmail(email.value) ? errors.value.push("L'email est invalide") : null
    !password.value ? errors.value.push('Saisis un mot de passe') : null
    !errors.value.length ? true : false

    if (errors.value.length === 0) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.value,
                password.value
            )
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

            router.push({ path: '/dashboard' })
        } catch (error) {
            console.error('Erreur de connexion :', error.message)
        }
    }
}
</script>
