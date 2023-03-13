<script setup>
import { ref } from 'vue'
defineProps({
    item: {
        type: Array,
        required: true,
    }
})

let defaultActive = ref('')

const hasCurrent = (item) => {
    let status = false
    item.children.forEach((val) => {
        if (val.path == defaultActive.value) {
            status = true
        }
    })
    return status
}
</script>
<template>
    <div v-if="item">
        <template v-for="(items, index) in item">
            <template v-if="!items.children">
                <el-menu-item :index="items.path" :key="index">
                    <template #title>
                        <div
                            :class="[defaultActive == items.path || (items.subpath && items.subpath.indexOf(defaultActive)) > -1 ? 'active' : '']">
                            <svg-icon :iconName="items.icon" class="icon" />
                            <span>{{ items.title }}</span>
                        </div>
                    </template>
                </el-menu-item>
            </template>
            <template v-else>
                <el-sub-menu class="secindary" :index="items.path" :key="index">
                    <template #title>
                        <div :class="['menu-title flex-start', hasCurrent(items) ? 'active' : '']">
                            <svg-icon :iconName="items.icon" class="icon" />
                            <span>{{ items.title }}</span>
                        </div>
                    </template>
                    <el-menu-item v-for="(child, ind) in items.children" :key="ind" :index="child.path"
                        :class="[defaultActive == child.path || (child.subpath && child.subpath.indexOf(defaultActive)) > -1 ? 'active' : '']">
                        {{ child.title }}
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