<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { cloneDeep } from 'lodash'

const emit = defineEmits(['clear', 'search'])

let props = defineProps({
	/**
	 * 配置项
	 */
	config: {
		type: Array,
		default: () => []
	},
	/**
	 * 是否显示清空
	 */
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	 * 表单数据
	 */
	data: {
		type: Object,
		default: () => {}
	}
})

/** 最长label宽度 */
let maxLabelWidth = ref(0)

/**
 * 计算文本width
 * @param {*} text
 */
const measureTextWidth = (text) => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	ctx.font =
		'14px  Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif' // 设置字体样式
	return ctx.measureText(text).width // 获取文字宽度
}

/**
 * 获取所有文本，计算最大宽度
 */
const calculateMaxLabelWidth = () => {
	const labels = props.config.map((item) => item.label) // 获取所有label文字
	const labelWidths = labels.map((label) => measureTextWidth(label)) // 计算所有label的文字宽度
	maxLabelWidth.value = Math.max(...labelWidths) // 获取最大的文字宽度
}

// 默认data
let defaultForm = ref({})

onMounted(() => {
	calculateMaxLabelWidth()
	defaultForm.value = cloneDeep(props.data)
})

/**
 * 搜索
 */
let search = () => {
	emit('search')
}

/**
 * 清空
 */
let clear = () => {
	emit('clear', defaultForm.value)
	search()
}

/**
 * 日期格式 参考 https://day.js.org/docs/en/display/format#list-of-all-available-formats
 * @param {*} type
 * @param {*} format
 */
const getFormat = (type, format = '') => {
	const FORMAT_ENUM = {
		year: 'YYYY',
		month: 'YYYY-MM',
		date: 'YYYY-MM-DD',
		dates: 'YYYY-MM-DD',
		datetime: 'YYYY-MM-DD HH:mm:ss',
		week: 'YYYY-MM-DD',
		datetimerange: 'YYYY-MM-DD HH:mm:ss',
		daterange: 'YYYY-MM-DD',
		monthrange: 'YYYY-MM'
	}
	return format || FORMAT_ENUM[type]
}

/**
 * 是否为timerPicker
 * @param {*} type 类型
 */
const isTimerPicker = (type) => {
	const TIME_TYPE_ENUM = [
		'year',
		'month',
		'date',
		'dates',
		'datetime',
		'week',
		'datetimerange',
		'daterange',
		'monthrange'
	]
	return TIME_TYPE_ENUM.includes(type)
}
</script>
<template>
	<el-form :model="data">
		<div class="base-search-form-wrapper flex-start">
			<div v-for="item in config" :key="item.key" class="items flex-start">
				<span class="label" :style="{ width: maxLabelWidth + 'px' }">
					{{ item.label }}
				</span>
				<div class="item-content">
					<!-- input -->
					<el-input
						v-if="item.type === 'input'"
						v-model="data[item.key]"
						:placeholder="item.placeholder"
						:clearable="clearable"
					/>
					<!-- select -->
					<el-select
						v-if="item.type === 'select'"
						v-model="data[item.key]"
						:placeholder="item.placeholder"
						:filterable="item.filterable || true"
						:clearable="clearable"
					>
						<el-option
							v-for="child in item.options"
							:key="child.value"
							:label="child.label"
							:value="child.value"
						/>
					</el-select>
					<!-- datePicker -->
					<el-date-picker
						v-if="isTimerPicker(item.type)"
						v-model="data[item.key]"
						:editable="item.editable || false"
						:placeholder="item.placeholder"
						:start-placeholder="item.startPlaceholder"
						:end-placeholder="item.endPlaceholder"
						:type="item.type"
						:format="getFormat(item.type, item.format)"
						:value-format="item.valueFormat || 'x'"
						:disabled-date="item.disabledDate"
					/>
					<!--interval  -->
					<div v-if="item.type === 'interval'" class="interval-box flex-bt">
						<el-input
							v-model="data[item.key[0]]"
							:placeholder="item.startPlaceholder"
							:clearable="clearable"
						/>
						<span class="centerText">{{ item.centerText || '至' }}</span>
						<el-input
							v-model="data[item.key[1]]"
							:placeholder="item.endPlaceholder"
							:clearable="clearable"
						/>
					</div>
				</div>
			</div>
			<div class="items">
				<el-button type="primary" @click="search"> 查询 </el-button>
				<el-button @click="clear"> 清空 </el-button>
			</div>
		</div>
	</el-form>
</template>
<style lang="scss" scoped>
.base-search-form-wrapper {
	width: 100%;
	flex-wrap: wrap;

	.items {
		margin-right: 24px;
		margin-bottom: 16px;

		.label {
			text-align: right;
		}

		.item-content {
			width: 220px;
		}

		.interval-box {
			.centerText {
				margin: 0 6px;
			}
		}
	}
}
</style>
<style scoped>
.base-search-form-wrapper :deep() .el-date-editor {
	width: 100%;
}

.base-search-form-wrapper :deep() .el-date-editor .el-input__wrapper {
	width: 100%;
}

.base-search-form-wrapper :deep() .el-select {
	width: 100%;
}
</style>
