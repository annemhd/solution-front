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
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.config.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const db = getFirestore()

const submit = async () => {
    try {
        const authResult = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = authResult.user

        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, {
            firstname: user.email,
            lastname: lastname.value,
            email: user.email,
            password: password.value,
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
</script>
