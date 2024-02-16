<template>
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="https://console.firebase.google.com/u/0/project/solution-cloud-dd932/storage/solution-cloud-dd932.appspot.com/files?hl=fr"
        :auto-upload="false"
    >
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="sub()"> upload to server </el-button>

        <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
    </el-upload>
</template>
<script setup>
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase.config.js'

let uploadRef

const mountainsRef = ref(storage, 'Yayoi Kusama.jpg')

const sub = () => {
    console.log(uploadRef)
    uploadRef.submit()
    uploadBytes(mountainsRef, uploadRef).then((snapshot) => {
        console.log('Uploaded a blob or file!' + snapshot)
    })
}
</script>
