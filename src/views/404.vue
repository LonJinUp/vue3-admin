<template>
	<div class="no-page-wrapper flex-center">
		<img src="@/assets/images/404.png" alt="" />
		<p class="tips">页面未找到</p>
	</div>
</template>
<style lang="scss" scoped>
.no-page-wrapper {
	width: 100%;
	height: 100%;
	background: #ffffff;
	flex-wrap: wrap;
	flex-direction: column;

	img {
		width: 400px;
	}

	.tips {
		width: 100%;
		font-size: 18px;
		font-weight: bold;
		color: $text-color-primary;
		text-align: center;
		margin-top: 16px;
	}
}
</style>
