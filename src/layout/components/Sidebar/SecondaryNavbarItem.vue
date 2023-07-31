<script setup>
import { useRoute } from 'vue-router'
import { useTabStore } from '@/store'
const route = useRoute()

defineProps({
    item: {
        type: Array,
        required: true,
    }
})


const clickEvent = (val) => {
    const tab = useTabStore()
    tab.addTabItem(val)
}

</script>
<template>
    <div v-if="item">
        <template v-for="(item, index) in item">
            <!-- 如果没有子菜单 -->
            <template v-if="!item.children">
                <el-menu-item :index="item.path" :key="index" @click="clickEvent(item)">
                    <template #title>
                        <div :class="[route.path == item.path ? 'active' : '']">
                            <svg-icon :iconName="item.icon" class="icon" />
                            <span>{{ item.meta.title }}</span>
                        </div>
                    </template>
                </el-menu-item>
            </template>
            <template v-else>
                <el-sub-menu class="secindary" :index="item.path" :key="index">
                    <template #title>
                        <div :class="['menu-title flex-start', route.path == item.path ? 'active' : '']">
                            <svg-icon :iconName="item.icon" class="icon" />
                            <span>{{ item.meta.title }}</span>
                        </div>
                    </template>
                    <el-menu-item v-for="(child, ind) in item.children" :key="ind" @click="clickEvent(child)"
                        :index="child.path" :class="[route.path == item.path ? 'active' : '']">
                        {{ child.meta.title }}
                    </el-menu-item>
                </el-sub-menu>
            </template>
        </template>
    </div>
</template>
<style scoped>
.secindary {
    border-bottom: 1px #e5e7eb solid;
}

.secindary.is-opened {
    padding-bottom: 8px !important;
}

.menu-title.active span {
    color: #456ce6;
}

.is-active,
.is-active>span {
    color: inherit !important;
}

.active,
.active>span {
    color: #456ce6 !important;
}

.menu-title {
    font-size: 12px;
}

.icon {
    margin-right: 4px;
}

/*.is-active { background: #fff !important;}*/
:deep() .el-sub-menu__title {
    height: 40px;
    padding: 0 14px !important;
}

:deep() .el-menu-item {
    min-width: 100%;
    height: 40px;
    font-size: 12px;
}

:deep() .el-sub-menu__icon-arrow {
    right: 14px;
}
</style>