<script setup>
import { ref } from 'vue'
import NotificationBar from './components/NotificationBar.vue'
import EchartCard from './components/EchartCard.vue'
import StatisticsModule from './components/StatisticsModule.vue'
import LoginInfo from './components/LoginInfo.vue'
import QuickEntry from './components/QuickEntry.vue'

let adList = ref([
	{ title: '这是一条可以滚动的新闻公告1', id: 0 },
	{ title: '这是一条可以滚动的新闻公告2', id: 1 },
	{ title: '这是一条可以滚动的新闻公告3', id: 2 }
])

const merchantStatisticsList = ref({
	tabActive: 'yesterday',
	title: '数据预览',
	list: [
		{
			sum: 0,
			title: '开通商户数（个）',
			key: 'mchtNum'
		},
		{
			sum: 0,
			title: '商户交易额（元）',
			key: 'mchtTurnover'
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			key: 'activateDeviceNum'
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			key: 'activateDeviceNum'
		}
	]
})
const statisticsList = ref({
	tabActive: 'yesterday',
	title: '排行榜',
	data: [
		{
			name: '按商户交易额',
			unit: '万元',
			list: [
				{ name: '老王', quantity: 129 },
				{ name: '老李', quantity: 430 },
				{ name: 'Tom', quantity: 440 },
				{ name: '老刘', quantity: 477 },
				{ name: '沸羊羊', quantity: 827 },
				{ name: '懒洋洋', quantity: 492 }
			]
		},
		{
			name: '发展商户数',
			unit: '个',
			list: [
				{ name: '老李', quantity: 2833 },
				{ name: '沸羊羊', quantity: 8253 }
			]
		},
		{
			name: '按激活收款设备数',
			unit: '个',
			list: []
		}
	]
})

const handleRadioChange = (value) => {
	console.log('左侧数据点击时间', value)
}
const listRankingChange = (value) => {
	console.log('列表日月点击事件', value)
}
const updateTabData = (value) => {
	console.log('列表切换tab点击事件', value)
}
</script>
<template>
	<div class="dashboard-wrapper">
		<notification-bar :list="adList" :interval="5000"></notification-bar>
		<div class="dashboard-main flex-bt">
			<div class="left">
				<statistics-module
					:merchantStatisticsList="merchantStatisticsList"
					:statisticsList="statisticsList"
					@handleRadioChange="handleRadioChange"
					@listRankingChange="listRankingChange"
					@updateTabData="updateTabData"
				/>
				<echart-card></echart-card>
			</div>
			<div class="right">
				<login-info></login-info>
				<quick-entry></quick-entry>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.dashboard-wrapper {
	width: 100%;
	height: 100%;

	.dashboard-main {
		width: 100%;
		align-items: inherit;
		padding-top: 20px;

		.left {
			flex: 1;
			margin-right: 20px;
		}

		.right {
			width: 262px;
		}
	}

	.echarts-box {
		width: 100%;

		.items {
			width: 30%;
		}
	}
}
</style>
