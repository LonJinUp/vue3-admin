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
	{ title: '这是一条可以滚动的新闻公告3', id: 2 },
])
const merchantStatisticsList = ref({
	activeName: 'untreated',
	title: '这是标题',
	list: [
		{
			sum: 0,
			title: '开通商户数（个）',
			// img: '/assets/images/WechatIMG80.jpeg',
			key: 'mchtNum',
		},
		{
			sum: 0,
			title: '商户交易额（元）',
			// img: '/assets/images/WechatIMG80.jpeg',
			key: 'mchtTurnover',
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			// img: '/assets/images/WechatIMG80.jpeg',
			key: 'activateDeviceNum',
		},
		{
			sum: 0,
			title: '激活收款设备数（台）',
			// img: '/assets/images/WechatIMG80.jpeg',
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
	}
)

const handleRadioChange = (value) => {
	console.log('左侧数据点击时间', value);
}
const listRankingChange = (value) => {
	console.log('列表日月点击事件', value);
}
const updateTabData = (value) => {
	console.log('列表切换tab点击事件', value);
}

</script>
<template>
	<div class="dashboard-wrapper">
		<notification-bar :list="adList" :interval="5000"></notification-bar>
		<div class="dashboard-main flex-bt">
			<div class="left">
				<statistics-module :merchantStatisticsList="merchantStatisticsList" :statisticsList="statisticsList"
					@handleRadioChange="handleRadioChange" @listRankingChange="listRankingChange"
					@updateTabData="updateTabData" />
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
