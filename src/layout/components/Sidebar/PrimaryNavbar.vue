<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const emit = defineEmits(['updateDalayClose', 'changePrimaryMenuItem'])
const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)
let ivMouseEnter = ref(null)

/**
 * 鼠标离开
 */
const handleMouseLeave = () => {
	clearTimeout(ivMouseEnter)
	emit('updateDalayClose', true)
}

/**
 * 鼠标移入
 * @param {Object} item
 */
const handleMouseEnter = (item) => {
	if (!item) return
	clearTimeout(ivMouseEnter)
	ivMouseEnter.value = setTimeout(() => {
		emit('updateDalayClose', false)
		if (item.children && item.children.length) {
			emit('changePrimaryMenuItem', item)
		} else {
			emit('changePrimaryMenuItem', {})
		}
	}, 100)
}

/**
 * 一级菜单点击事件
 * @param {Object} item
 */
const handleClick = (item) => {
	if (!item) return
	emit('changePrimaryMenuItem', item)
	router.push(item.redirect || item.path).catch((error) => {
		console.log(error, '--handleClick')
	})
}

/**
 * 查找当前路由是否在当前menuChild中
 * @param {Object} item
 */
const findPath = (item) => {
	if (route.path == (item.redirect || item.path)) {
		return true
	}
	if (item.children && item.children.length) {
		return item.children.some((i) => i.path == route.path)
	}
}
</script>
<template>
	<div class="primary-navBar-wrapper">
		<div class="logo-container flex-center">
			<div class="logo">
				<img src="@/assets/logo.svg" alt="" />
			</div>
		</div>
		<ul class="menu-list" @mouseleave="handleMouseLeave">
			<li
				v-for="(item, index) in menu"
				:key="index"
				@mouseenter="handleMouseEnter(item, index)"
				@click="handleClick(item, index)"
				:class="['items', findPath(item) ? 'active' : '']"
			>
				<svg-icon
					class="icon"
					:width="26"
					:height="26"
					:iconName="item.meta.icon"
				></svg-icon>
				<p>{{ item.meta.title }}</p>
			</li>
		</ul>
	</div>
</template>
<style lang="scss" scoped>
.primary-navBar-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 60px;
	height: 100%;
	overflow: hidden;
	background: #111827;

	.logo-container {
		width: 60px;
		height: 48px;

		.logo {
			width: 36px;
			height: 36px;
			background: #ffffff;
			border-radius: 50%;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.menu-list {
		margin-top: 10px;

		.items {
			width: 100%;
			height: 60px;
			background: #111827;
			box-shadow: 0 -1px 0 0 rgb(229 231 235 / 5%);
			cursor: pointer;

			&:hover,
			&.active {
				.icon {
					color: #ffffff;
				}

				p {
					color: #ffffff;
				}
			}

			.icon {
				display: block;
				margin: 0 auto;
				color: rgb(112, 116, 125);
				transition: all 0.3s;
			}

			p {
				text-align: center;
				color: rgb(112, 116, 125);
				font-size: 12px;
				margin-top: 2px;
				transition: all 0.3s;
			}
		}
	}
}
</style>
