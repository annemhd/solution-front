<template>
    <div class="m-4">
        <client-only>
            <!-- <el-header> ??? </el-header> -->
            <el-main>
                <NuxtPage />
            </el-main>
            <el-footer></el-footer>
        </client-only>
    </div>
</template>
<script setup>
import 'element-plus/dist/index.css'
useHead({
    title: 'Firebase',
    meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
