<script setup>
import { useRoute } from 'vue-router'
import BreadCrumb from './BreadCrumb.vue'
import TabPage from './TabPage.vue'

const route = useRoute()


</script>
<template>
    <div class="mainSection-wrapper">
        <tab-page v-if="route.name != 'Dashboard'" />
        <bread-crumb v-if="route.name != 'Dashboard'" />
        <div id="container">
            <router-view v-slot="{ Component }">
                <transition class="fade" name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mainSection-wrapper {
    flex: 1;
    position: relative;
    overflow-x: hidden;

    #container {
        height: calc(100% - 80px);
        padding: 20px;
        overflow-y: auto;
        box-sizing: border-box;
        position: relative;
    }

    .fade {
        transition: 0.3s ease-out;
    }

    // 主内容区动画
    .fade-enter-from,
    .fade-leave-to {
        transform: translateX(50px);
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        transform: translateX(0px);
        opacity: 1;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: 0.3s ease-out;
    }
}
</style>