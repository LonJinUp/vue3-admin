<script setup>
const emit = defineEmits(['handleRadioChange', 'listRankingChange', 'updateTabData'])

const props = defineProps({
	merchantStatisticsList: {
		type: Object,
		default: () => {}
	},
	statisticsList: {
		type: Object,
		default: () => {}
	}
})

const handleRadioChange = (value) => {
	emit('handleRadioChange', value)
}

const listRankingChange = (value) => {
	emit('listRankingChange', value)
}

const updateTabData = (value) => {
	emit('updateTabData', value)
}
</script>

<template>
	<div class="polymerization-wrapper">
		<div class="polymerization">
			<div class="polymerization-info flex-bt">
				<div class="polymerization-left">
					<div class="top flex-bt">
						<div class="title">{{ merchantStatisticsList.title }}</div>
						<div class="button-box">
							<el-radio-group
								v-model="merchantStatisticsList.tabActive"
								@change="handleRadioChange"
							>
								<el-radio-button label="yesterday">昨日</el-radio-button>
								<el-radio-button label="month">本月</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="bottom">
						<div
							v-for="(item, index) in merchantStatisticsList.list"
							:key="index"
							class="items"
						>
							<div class="sum">{{ item.sum }}</div>
							<div class="title">{{ item.title }}</div>
						</div>
					</div>
				</div>

				<div class="polymerization-boder"></div>

				<div class="polymerization-right">
					<div class="top flex-bt">
						<div class="title">{{ statisticsList.title }}</div>
						<div class="button-box">
							<el-radio-group
								v-model="statisticsList.tabActive"
								@change="listRankingChange"
							>
								<el-radio-button label="yesterday">昨日</el-radio-button>
								<el-radio-button label="month">本月</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="bottom">
						<el-tabs @tab-click="updateTabData">
							<el-tab-pane
								v-for="(tab, index) in statisticsList.data"
								:key="index"
								:label="tab.name"
							>
								<div class="table-box">
									<div
										class="items flex-bt"
										v-for="(item, index) in tab.list"
										:key="index"
									>
										<div class="left flex-start">
											<span class="num">{{ index + 1 }}</span>
											<span class="name">{{ item.name }}</span>
										</div>
										<div class="right">
											{{ item.quantity }} {{ tab.unit }}
										</div>
									</div>
									<el-empty
										v-if="tab.list.length == 0"
										:image-size="30"
										description="暂无数据"
									/>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.polymerization {
	background: #ffffff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
	border-radius: 4px;

	.polymerization-info {
		align-items: self-start;

		.top {
			padding: 16px 20px;

			.title {
				font-size: 14px;
				font-family:
					PingFangSC-Medium,
					PingFang SC;
				font-weight: 600;
				color: #111827;
				line-height: 20px;
				position: relative;

				&::before {
					background-color: #456ce6;
					content: ' ';
					padding-left: 4px;
					border-radius: 0px 3px 3px 0px;
					margin-right: 8px;
				}
			}
		}

		.polymerization-left {
			width: 50%;
			height: 100%;
			position: relative;

			.bottom {
				display: flex;
				margin-left: 20px;
				flex-wrap: wrap;

				.items {
					position: relative;
					background: #f7f8f9;
					padding: 20px 0px 40px 16px;
					margin-right: 20px;
					margin-bottom: 16px;
					width: calc(50% - 20px);

					.sum {
						font-size: 18px;
						font-family:
							PingFangSC-Medium,
							PingFang SC;
						font-weight: 500;
						color: #456ce6;
						line-height: 26px;
					}

					.title {
						font-size: 12px;
						font-family:
							PingFangSC-Regular,
							PingFang SC;
						font-weight: 400;
						color: #111827;
						line-height: 18px;
						position: absolute;
						z-index: 99;
					}

					.left-img {
						position: absolute;
						bottom: 0;
						right: 0;
						height: 80px;
						width: 80px;
						opacity: 0.2;
					}
				}
			}
		}

		.polymerization-boder {
			width: 1px;
			background: #f3f4f6;
			margin: 20px 0px;
		}

		.polymerization-right {
			width: 50%;

			.bottom {
				line-height: 36px;
				padding-right: 20px;
				padding-left: 20px;

				.table-box {
					width: 100%;
					max-height: 140px;
					overflow-y: auto;
					padding-right: 16px;

					.items {
						width: 100%;
						height: 30px;

						&:nth-child(1) {
							.left .num {
								background: #456ce6;
								color: #ffffff;
							}
						}

						&:nth-child(2) {
							.left .num {
								background: #a2b5f2;
								color: #ffffff;
							}
						}

						&:nth-child(2) {
							.left .num {
								background: #dae2fa;
								color: #ffffff;
							}
						}

						.left {
							.name {
							}

							.num {
								width: 16px;
								height: 16px;
								background: #cfd0d3;
								color: #ffffff;
								border-radius: 4px;
								text-align: center;
								line-height: 16px;
								font-weight: 600;
								font-family:
									PingFangSC-Medium,
									PingFang SC;
								font-size: 12px;
								margin-right: 12px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
