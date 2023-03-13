<script setup>
import { ref } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import EchartCard from '@/components/EchartCard.vue'
let adList = ref([
    { title: '这是一条可以滚动的新闻公告1', id: 0 },
    { title: '这是一条可以滚动的新闻公告2', id: 1 },
    { title: '这是一条可以滚动的新闻公告3', id: 2 }
])
</script>
<template>
    <div class="dashboard-wrapper">
        <notification-bar :list="adList" :interval="5000"></notification-bar>
        <echart-card></echart-card>
    </div>
</template>
<style lang="scss" scoped>
.dashboard-wrapper {
    width: 100%;
    height: 100%;

    .echarts-box {
        width: 100%;

        .items {
            width: 30%;
        }
    }
}
</style>
