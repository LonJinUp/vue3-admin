<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['updateDalayClose', 'changePrimaryMenuItem'])
const menuStore = useUserStore()
const { menu } = storeToRefs(menuStore)
let hoverIndex = ref(-1)
let activeIndex = ref(0)
let ivMouseEnter = ref(null)

// 鼠标离开
let handleMouseLeave = () => {
    clearTimeout(ivMouseEnter)
    hoverIndex.value = -1
    emit('updateDalayClose', true)
}

// 鼠标移入
let handleMouseEnter = (item, index) => {
    if (!item) return;
    clearTimeout(ivMouseEnter)
    ivMouseEnter.value = setTimeout(() => {
        hoverIndex.value = index
        emit('updateDalayClose', false)
        if (item.children && item.children.length) {
            emit('changePrimaryMenuItem', item)
        } else {
            emit('changePrimaryMenuItem', {})
        }
    }, 100)
}

// 一级菜单点击事件
let handleClick = (item, index) => {
    if (!item) return;
    activeIndex.value = index
    console.log(activeIndex, '=====')
    emit('changePrimaryMenuItem', item)
    router.push(item.redirect || item.path).catch((error) => {
        console.log(error, '--handleClick')
    })
}

</script>
<template>
    <div class="primary-navBar-wrapper">
        <div class="logo-container flex-center">
            <div class="logo">
                <img src="@/assets/logo.svg" alt="">
            </div>
        </div>
        <ul class="menu-list" @mouseleave="handleMouseLeave">
            <li :class="[activeIndex === index ? 'items active' : 'items']" v-for="(item, index) in menu" :key="index"
                @mouseenter="handleMouseEnter(item, index)" @click="handleClick(item, index)">
                <svg-icon class="icon" :width="26" :height="26" :iconName="item.meta.icon"></svg-icon>
                <p>{{ item.meta.title }}</p>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.primary-navBar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 100%;
    overflow: hidden;
    background: #111827;

    .logo-container {
        width: 60px;
        height: 48px;

        .logo {
            width: 36px;
            height: 36px;
            background: #ffffff;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .menu-list {
        margin-top: 10px;

        .items {
            width: 100%;
            height: 60px;
            background: #111827;
            box-shadow: 0 -1px 0 0 rgb(229 231 235 / 5%);
            cursor: pointer;

            &:hover,
            &.active {
                .icon {
                    color: #ffffff;
                }

                p {
                    color: #ffffff;
                }
            }

            .icon {
                display: block;
                margin: 0 auto;
                color: rgb(112, 116, 125);
                transition: all .3s;
            }

            p {
                text-align: center;
                color: rgb(112, 116, 125);
                font-size: 12px;
                margin-top: 2px;
                transition: all .3s;
            }
        }
    }
}
</style>