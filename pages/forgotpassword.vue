<template>
    <el-input v-model="email" placeholder="Email" />
    <el-button>Envoyer</el-button>
</template>
<script>
import { ref } from 'vue'

const email = ref('')
</script>
