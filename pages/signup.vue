<template>
    <el-card class="box-card">
        <el-input v-model="firstname" placeholder="Prénom" />
        <el-input v-model="lastname" placeholder="Nom" />
        <el-input v-model="email" placeholder="Email" />
        <el-input v-model="password" placeholder="Mot de passe" />
        <el-input v-model="passwordConfirmation" placeholder="Confirmation du mot de passe" />
        <el-button>S'inscrire</el-button>
        <a href="/signin">
            <el-button type="primary" text>se connecter</el-button>
        </a>
    </el-card>
</template>
<script>
import { ref } from 'vue'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
</script>
