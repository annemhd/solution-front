<template>
    <el-card class="box-card">
        <!-- <el-input v-model="firstname" placeholder="Prénom" />
        <el-input v-model="lastname" placeholder="Nom" /> -->
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

// const firstname = ref('')
// const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const submit = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value).then((result) => {
        console.log(result)
    })
}
</script>
