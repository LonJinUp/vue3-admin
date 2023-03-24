<script setup>
import { ref } from 'vue'
let config = ref([
    { label: '当前登录账号：', value: 'admin' },
    { label: '上次登录时间：', value: '2023-03-24 18:30:24' },
    { label: '账号角色：', value: '管理员' },
])
</script>
<template>
    <div class="login-info-wrapper">
        <div class="items flex-start" v-for="(item, index) in config" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
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

    .items {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #888B93;
        line-height: 18px;
        margin-bottom: 8px;

        &:last-child {
            margin-bottom: 0px;
        }

        .label {
            color: #111827;
        }
    }
}
</style>