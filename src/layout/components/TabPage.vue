<script setup>
import { useTabStore } from '@/store'
import { storeToRefs } from 'pinia'
const tabStore = useTabStore()
const { tab, tabActive } = storeToRefs(tabStore)

/**
 * 关闭某个tab标签
 * @param {Number} index
 */
const removeTab = (index) => {
	tabStore.removeTabItem(index)
}

const dropMenu = [
	{ name: '关闭当前标签页', type: 'closeCurrentTab' },
	{ name: '关闭其它标签页', type: 'closeOtherTabs' },
	{ name: '关闭全部标签页', type: 'closeAllTabs' }
]

const onDropItemClick = (item, index) => {
	if (item.type === 'closeCurrentTab') {
		tabStore.removeTabItem(index)
	} else if (item.type === 'closeOtherTabs') {
		tabStore.removeOtherTabItem(index)
	} else if (item.type === 'closeAllTabs') {
		tabStore.clearTab()
	}
}
</script>
<template>
	<div class="tabpage-wrapper">
		<el-tabs
			:model-value="tabActive"
			type="card"
			class="demo-tabs"
			closable
			@tab-remove="removeTab"
		>
			<el-tab-pane
				v-for="(item, index) in tab"
				:key="index"
				:label="item.meta.title"
				:name="index"
			/>
		</el-tabs>
		<div class="dropmenu flex-center">
			<el-dropdown>
				<div class="more-menu" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							v-for="item in dropMenu"
							:key="item.type"
							:command="item.type"
							@click="onDropItemClick(item, tabActive)"
						>
							{{ item.name }}
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.tabpage-wrapper {
	position: relative;
	background: #f9fafb;
	width: 100%;

	.dropmenu {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 50px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-bottom: 1px #e5e7eb solid;
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
</style>
<style scoped>
.tabpage-wrapper :deep(.el-tabs__content) {
	display: none;
}

.tabpage-wrapper :deep(.el-tabs__header) {
	margin: 0;
}

.tabpage-wrapper :deep(.el-tabs__item.is-active) {
	background: #ffffff;
}
</style>
