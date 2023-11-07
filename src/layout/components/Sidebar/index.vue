<script setup>
import { ref, watch } from 'vue'
import SecondSidebar from './SecondSidebar.vue'
import PrimaryNavbar from './PrimaryNavbar.vue'
import { useMenuStore } from '@/store'
import { storeToRefs } from 'pinia'

let dalayClose = ref(false)
let dalayCloseCallback = ref(null)
let primaryMenuItemLength = ref(0)
let primaryMenuItem = ref({})

const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)

watch(dalayClose, (val) => {
	if (val) {
		dalayCloseCallback.value = setTimeout((_) => {
			dalayClose.value = false
			primaryMenuItem.value = menu.value[0]
		}, 100)
	} else {
		clearTimeout(dalayCloseCallback.value)
	}
})

watch(primaryMenuItem, (val) => {
	if (val.children && val.children.length) {
		primaryMenuItemLength.value = val.children.length
	} else {
		primaryMenuItemLength.value = 0
	}
})

let updateDalayClose = (val) => {
	dalayClose.value = val
}

// 当前选中菜单
let changePrimaryMenuItem = (item) => {
	primaryMenuItem.value = item
}
</script>
<template>
	<div class="sideBar-wrapper" :class="[primaryMenuItemLength ? 'active' : '']">
		<!-- 一级 -->
		<primary-navbar
			@updateDalayClose="updateDalayClose"
			@changePrimaryMenuItem="changePrimaryMenuItem"
		/>
		<!-- 二级 -->
		<second-sidebar
			v-if="primaryMenuItemLength"
			:primaryMenuItem="primaryMenuItem"
			@updateDalayClose="updateDalayClose"
		/>
	</div>
</template>
<style lang="scss" scoped>
.sideBar-wrapper {
	width: 60px;
	overflow: hidden;

	&.active {
		width: 206px;
	}
}
</style>
