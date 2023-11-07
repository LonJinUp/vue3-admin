<script setup>
import { ref } from 'vue'
const props = defineProps({
	/**
	 * 配置项
	 */
	header: {
		type: Array,
		default: () => []
	},
	/**
	 * 数据
	 */
	data: {
		type: Array,
		default: () => []
	}
})

let currentPage = ref(1)
let pageSize = ref(30)

let handleSizeChange = (val) => {
	console.log(val)
}

let handleCurrentChange = (val) => {
	console.log(val)
}
</script>
<template>
	<div class="table-wrapper">
		<el-table class="table" stripe :data="data" style="width: 100%">
			<el-table-column
				v-for="item in header"
				:min-width="item.minWidth"
				:fixed="item.fixed"
				label-class-name="black"
				:key="item.prop"
				:label="item.label"
				:prop="item.prop"
			>
				<template #default="scope">
					<!-- 操作按钮 -->
					<template v-if="item.operation">
						<el-button
							v-for="(options, key) in item.operation"
							:key="key"
							:style="item.style"
							@click="options.onClick(scope.row)"
							:disabled="options.disabled || false"
							:type="options.type || 'primary'"
							link
							size="small"
						>
							{{ options.name }}
						</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination flex-end">
			<el-pagination
				:current-page="currentPage"
				:page-size="pageSize"
				:page-sizes="[30, 50, 80, 100]"
				layout="total, sizes, prev, pager, next"
				:total="1000"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.table-wrapper {
	.pagination {
		margin-top: 12px;
	}
}
</style>
<style scoped>
.table-wrapper :deep(.el-table thead) {
	color: #000000;
}
</style>
