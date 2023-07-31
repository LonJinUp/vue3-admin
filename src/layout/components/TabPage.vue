<template>
    <div class="tabpage-wrapper">
        <el-tabs :model-value="tabActive" type="card" class="demo-tabs" closable @tab-remove="removeTab">
            <el-tab-pane v-for="(item, index) in tab" :key="index" :label="item.meta.title" :name="index">
            </el-tab-pane>
        </el-tabs>
        <div class="dropmenu flex-center">
            <el-dropdown @command="onCommand">
                <div class="more-menu"></div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeCurrentTab">关闭当前标签页</el-dropdown-item>
                        <el-dropdown-item command="closeOtherTabs">关闭其它标签页</el-dropdown-item>
                        <el-dropdown-item command="closeAllTabs">关闭全部标签页</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTabStore } from '@/store'
import { storeToRefs } from 'pinia'

const tabStore = useTabStore()
const { tab, tabActive } = storeToRefs(tabStore)


// 关闭某个tab标签
const removeTab = (index) => {
    tabStore.removeTabItem(index)
}
// 下拉菜单事件
const onCommand = (command) => {
    console.log(command, '===command')
}
</script>
<style lang="scss" scoped>
.tabpage-wrapper {
    position: relative;
    background: #F9FAFB;
    width: 100%;

    .dropmenu {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px #E5E7EB solid;
        z-index: 100;

        .more-menu {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #898b93;
            cursor: pointer;
        }
    }
}

:deep(.el-tabs__content) {
    display: none;
}
</style>