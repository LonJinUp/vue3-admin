<script setup>

const emit = defineEmits(['handleRadioChange', 'listRankingChange', 'updateTabData'])
const props = defineProps({
	merchantStatisticsList: {
		type: Object,
		default: true,
	},
	statisticsList: {
		type: Object,
		default: true,
	},
});


const rankingStyle = (index) => {
	index > 3 && (index = 3);
	const STYLE_ENUM = {
		'0': 'table-td-one',
		'1': 'table-td-two',
		'2': 'table-td-three',
		'3': 'table-td-four',
	};
	return STYLE_ENUM[index];
};

const handleRadioChange = (value) => {
	emit('handleRadioChange', value);
};
const listRankingChange = (value) => {
	emit('listRankingChange', value);
};
const updateTabData = (value) => {
	emit('updateTabData', value);
};


</script>


<template>
	<div class="polymerization-wrapper">
		<div class="polymerization">
			<div class="polymerization-flex">
				<div class="polymerization-left">
					<div class="left-flex">
						<div class="left-title">{{ merchantStatisticsList.title }}</div>
						<div class="left-button">
							<el-radio-group v-model="merchantStatisticsList.activeName" @change="handleRadioChange">
								<el-radio-button label="untreated">昨日</el-radio-button>
								<el-radio-button label="processing">本月</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="left-conter">
						<div v-for="(item, index) in merchantStatisticsList.list" :key="index" class="left-for">
							<div class="sum">{{ item.sum }}</div>
							<div class="title">{{ item.title }}</div>
							<!-- <img src="@/assets/images/WechatIMG80.jpeg" alt="" class="left-img" /> -->
						</div>
					</div>
				</div>
				<div class="polymerization-boder"></div>
				<div class="polymerization-right">
					<div class="left-flex">
						<div class="left-title">{{ statisticsList.title }}</div>
						<div class="left-button">
							<el-radio-group v-model="statisticsList.activeName" @change="listRankingChange">
								<el-radio-button label="untreated">昨日</el-radio-button>
								<el-radio-button label="processing">本月</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="right-table">
						<el-tabs @tab-click="updateTabData">
							<el-tab-pane v-for="(tab, index) in statisticsList.data" :key="index" :label="tab.name">
								<table class="table-ww">
									<tr v-for="(item, index) in tab.data" :key="index" class="table">
										<td :class="[rankingStyle(index)]">
											{{ index + 1 }}
										</td>
										<td class="table-td-name">{{ item.iavName }}</td>
										<td class="table-td">{{ item.mchtNum }}个</td>
									</tr>
									<tr v-if="tab.data.length == 0">
										<td class="table-td-zw">暂无数据</td>
									</tr>
								</table>
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
	margin-top: 20px;

	.polymerization-flex {
		display: flex;

		.polymerization-left {
			width: 50%;
			height: 100%;
			position: relative;

			.left-flex {
				display: flex;
				justify-content: space-between;

				.left-title {
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #111827;
					line-height: 20px;
					margin: 20px 0px 16px 20px;
					position: relative;

					&::before {
						background-color: #456ce6;
						content: ' ';
						padding-left: 4px;
						border-radius: 0px 3px 3px 0px;
						margin-right: 8px;
					}
				}

				.left-button {
					margin-top: 15px;
					padding-right: 20px;
					position: relative;
				}
			}

			.left-conter {
				display: flex;
				margin-left: 20px;
				flex-wrap: wrap;

				.left-for {
					position: relative;
					background: #f7f8f9;
					padding: 20px 0px 40px 16px;
					margin-right: 20px;
					margin-bottom: 16px;
					width: calc(50% - 20px);

					.sum {
						font-size: 18px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #456ce6;
						line-height: 26px;
					}

					.title {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
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

			.left-flex {
				display: flex;
				justify-content: space-between;

				.left-title {
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #111827;
					line-height: 20px;
					margin: 20px 0px 16px 20px;

					&::before {
						background-color: #456ce6;
						content: ' ';
						padding-left: 4px;
						border-radius: 0px 3px 3px 0px;
						margin-right: 8px;
					}
				}

				.left-button {
					margin-top: 15px;
					padding-right: 20px;
				}
			}

			.right-table {
				line-height: 36px;
				margin-left: 20px;
				margin-right: 20px;

				.table {
					display: flex;
					background: #ffffff;
					border-bottom: 1px solid #e5e7eb;
					flex-wrap: wrap;

				}

				.table-td-one {
					width: 16px;
					height: 16px;
					background: #456ce6;
					color: #ffffff;
					border-radius: 4px;
					text-align: center;
					line-height: 16px;
					margin-top: 12px;
					font-weight: 600;
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 12px;
				}

				.table-td-two {
					width: 16px;
					height: 16px;
					background: #a2b5f2;
					color: #ffffff;
					border-radius: 4px;
					text-align: center;
					line-height: 16px;
					margin-top: 12px;
					font-weight: 600;
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 12px;
				}

				.table-td-three {
					width: 16px;
					height: 16px;
					background: #dae2fa;
					color: #ffffff;
					border-radius: 4px;
					text-align: center;
					line-height: 16px;
					margin-top: 12px;
					font-weight: 600;
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 12px;
				}

				.table-td-four {
					width: 16px;
					height: 16px;
					background: #cfd0d3;
					color: #ffffff;
					border-radius: 4px;
					text-align: center;
					line-height: 16px;
					margin-top: 12px;
					font-weight: 600;
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 12px;
				}

				.table-ww {
					width: 100%;
				}

				.table-td {
					width: 45%;
					line-height: 36px;
					margin-left: 10px;
					text-align: right;
				}

				.table-td-name {
					width: 45%;
					line-height: 20px;
					margin-left: 10px;
					margin-top: 8px;
				}
			}
		}
	}
}
</style>
