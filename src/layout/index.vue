<script setup>
import Sidebar from './components/Sidebar/index.vue'
import MainSection from './components/MainSection.vue'

</script>
<template>
   <div class="layout-wrapper">
        <sidebar></sidebar>
        <main-section></main-section>
   </div>
</template>
<style scoped lang="scss">
    .layout-wrapper{
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>