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
import { doc, setDoc, getFirestore , getDoc } from 'firebase/firestore'

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

 // Initialiser Firestore
 const db = getFirestore();

// Référence du document que vous souhaitez récupérer
const docRef = doc(db, "users", "ZUFSzhdgewUs44yWeaM7FqmArWs1");

// Récupérer les données du document
getDoc(docRef)
.then((docSnapshot) => {
if (docSnapshot.exists()) {
    console.log("Données du document:", docSnapshot.data());
} else {
    console.log("Ce document n'existe pas !");
}
})
.catch((error) => {
console.error("Erreur lors de la récupération du document:", error);
});

useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
