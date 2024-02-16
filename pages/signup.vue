<template>
    <el-card class="box-card">
        <el-input v-model="firstname" placeholder="Prénom" />
        <el-input v-model="lastname" placeholder="Nom" />
        <el-input v-model="email" placeholder="Email" />
        <el-input v-model="password" placeholder="Mot de passe" />
        <el-input v-model="passwordConfirmation" placeholder="Confirmation du mot de passe" />
        <el-button @click.prevent="submit()">S'inscrire</el-button>
        <a href="/signin">
            <el-button type="primary" text>se connecter</el-button>
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { crypto } from 'crypto-js'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const db = getFirestore()
const router = useRouter()
const errors = ref([])
const errorsAlert = computed(() => {
    return errors.value.length !== 0
})

onMounted(() => {
    if (localStorage.getItem('TOKEN')) {
        router.push({ path: '/dashboard' })
    }
})

const validEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}
const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return regex.test(password)
}

// function generateMD5(input) {
//     const hash = crypto.createHash('md5')
//     hash.update(input)
//     return hash.digest('hex')
// }

const submit = async () => {
    errors.value = []
    !firstname.value ? errors.value.push('Saisis ton prénom') : null
    !lastname.value ? errors.value.push('Saisis ton nom') : null
    !email.value ? errors.value.push('Saisis ton email') : null
    !validEmail(email.value) ? errors.value.push("L'email est invalide") : null
    !password.value ? errors.value.push('Saisis un mot de passe') : null
    !validPassword(password.value)
        ? errors.value.push(
              'Le mot de passe doit être de 8 caractères minimum, contenir 1 majuscule minimum et 1 chiffre minimum'
          )
        : null
    passwordConfirmation.value !== password.value
        ? errors.value.push('Les mots de passe sont différents')
        : null
    !errors.value.length ? true : false

    if (errors.value.length === 0) {
        try {
            const authResult = await createUserWithEmailAndPassword(
                auth,
                email.value,
                password.value
            )
            const user = authResult.user

            const userRef = doc(db, 'users', user.uid)
            await setDoc(userRef, {
                firstname: user.email,
                lastname: lastname.value,
                email: user.email,
                password: crypto.MD5(password.value).toString(),
            })
            ElMessage({
                message: 'Votre inscription à bien été enregistré !',
                type: 'success',
            })
        } catch (error) {
            ElMessage({
                message: "Une erreur s'est produite : " + error.message,
                type: 'error',
            })
        }
    }
}
</script>
