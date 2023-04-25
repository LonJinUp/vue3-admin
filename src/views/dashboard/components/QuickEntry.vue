<script setup>
import { ref } from 'vue'

const list = ref([
    { name: 'vue官网', url: 'https://cn.vuejs.org/' },
    { name: 'element官网', url: 'https://element-plus.gitee.io/zh-CN/' },
    { name: '', url: 'https://element-plus.gitee.io/zh-CN/' },
])
</script>
<template>
    <div class="login-info-wrapper">
        <div class="title">快捷入口</div>
        <div class="list">
            <a class="items flex-start" v-for="item in list" :key="item.url" :href="item.url" target="_back">
                <img src="" alt="">
                <span>{{ item.name }}</span>
            </a>
            <a href=""></a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login-info-wrapper {
    min-width: 262px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;

    .title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #111827;
        line-height: 20px;

    }
}
</style>