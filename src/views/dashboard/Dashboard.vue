<script setup>
import { ref } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import EchartCard from '@/components/EchartCard.vue'
import StatisticsModule from './components/StatisticsModule.vue'
let adList = ref([
	{ title: '这是一条可以滚动的新闻公告1', id: 0 },
	{ title: '这是一条可以滚动的新闻公告2', id: 1 },
	{ title: '这是一条可以滚动的新闻公告3', id: 2 },
])
const merchantStatisticsList = ref({
	activeName: 'untreated',
	title: '这是标题',
	list: [
		{
			sum: 0,
			title: '开通商户数（个）',
			img: 'assets/merchantstatistics.png',
			key: 'mchtNum',
		},
		{
			sum: 0,
			title: '商户交易额（元）',
			img: 'assets/merchtMony.png',
			key: 'mchtTurnover',
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			img: 'assets/merchtEquipment.png',
			key: 'activateDeviceNum',
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			img: 'assets/merchtEquipment.png',
			key: 'activateDeviceNum',
		},
	],
})
const statisticsList = ref(
	{
		activeName: 'untreated',
		title: '这是标题',
		data: [
			{
				name: '按商户交易额',
				data: [
					{ iavName: "测试十三", mchtNum: 4, },
					{ iavName: "测试十三", mchtNum: 4, }
				],
			},
			{
				name: '按商户交易额',
				data: [
					{ iavName: "测试十三", mchtNum: 4, },
					{ iavName: "测试十三", mchtNum: 4, }
				],
			},
			{
				name: '按激活收款设备数',
				data: [
					{ iavName: "测试十三", mchtNum: 4, },
					{ iavName: "测试十三", mchtNum: 4, }
				],
			},
		]
	})
</script>
<template>
	<div class="dashboard-wrapper">
		<notification-bar :list="adList" :interval="5000"></notification-bar>
		<statistics-module :merchantStatisticsList="merchantStatisticsList" :statisticsList="statisticsList" />
		<echart-card></echart-card>
	</div>
</template>
<style lang="scss" scoped>
.dashboard-wrapper {
	width: 100%;
	height: 100%;

	.echarts-box {
		width: 100%;

		.items {
			width: 30%;
		}
	}
}
</style>
