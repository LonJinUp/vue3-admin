<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from './BreadCrumb.vue'
import TabPage from './TabPage.vue'

const route = useRoute()

watch(route, (val) => {
    console.log(val)
})

</script>
<template>
    <div class="mainSection-wrapper">
        <tab-page v-if="route.name != 'Dashboard'" />
        <bread-crumb v-if="route.name != 'Dashboard'" />
        <div class="container" id="container">
            <router-view :key="route.fullPath" :page-title.sync="pageTitle" :breadcrumb.sync="breadcrumb"
                :removeTab.sync="removeTab" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mainSection-wrapper {
    flex: 1;
    position: relative;
    overflow-x: hidden;

    .container {
        height: calc(100% - 80px);
        padding: 20px;
        overflow-y: auto;
        box-sizing: border-box;
    }
}
</style>