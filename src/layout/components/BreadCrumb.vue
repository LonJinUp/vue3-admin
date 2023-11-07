<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let breadcrumbList = ref([])

// 生成面包屑
const breadcrumb = (route) => {
	return route
}

watch(
	route,
	(val) => {
		breadcrumbList.value = breadcrumb(val.matched)
	},
	{ deep: true, immediate: true }
)
</script>
<template>
	<div class="bread-crumb-wrapper flex-start">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item
				v-for="(item, index) in breadcrumbList"
				:key="index"
				:to="{ path: item.path }"
			>
				{{ item.meta.title }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<style lang="scss" scoped>
.bread-crumb-wrapper {
	height: 42px;
	background-color: #fff;
	box-shadow: inset 0px -1px 0px 0px rgba(229, 231, 235, 1);
	padding: 0 20px;
	box-sizing: border-box;
}
</style>
