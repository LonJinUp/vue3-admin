<script setup>
import { ref } from 'vue'

const list = ref([
	{ name: 'github', href: 'https://github.com/LonJinUp/vue3-admin', icon: 'github.png' },
	{ name: '博客', href: 'https://lonjinup.github.io/', icon: 'blog.png' },
	{ name: '建议&&联系我', href: 'https://lonjinup.github.io/aboutme/', icon: 'wechat.png' }
])

const getImageUrl = (name) => {
	return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
</script>
<template>
	<div class="login-info-wrapper">
		<div class="title font-size-default">快捷入口</div>
		<div class="list">
			<a
				class="items flex-start"
				v-for="item in list"
				:key="item.url"
				:href="item.href"
				target="_back"
			>
				<img :src="getImageUrl(item.icon)" alt="" />
				<span class="font-size-small">{{ item.name }}</span>
			</a>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.login-info-wrapper {
	min-width: 262px;
	background: #ffffff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
	padding: 20px;
	margin-top: 20px;

	.list {
		margin-top: 8px;

		.items {
			margin-bottom: 4px;
			color: $lonjin-color-primary;

			img {
				width: 16px;
				margin-right: 4px;
			}
		}
	}
}
</style>
