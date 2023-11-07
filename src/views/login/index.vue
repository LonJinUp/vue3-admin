<script setup>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ResetPassword from './components/ResetPassword.vue'
import { ref } from 'vue'

let activeName = ref('Login')

const changeActive = (val) => {
	activeName.value = val
}

const COMPONENT_ENUM = {
	Login: Login,
	Register: Register,
	ResetPassword: ResetPassword
}
</script>
<template>
	<div class="login-wrapper flex-center">
		<div class="content flex-bt">
			<div class="left flex-center">
				<svg-icon svg-class="icon" width="440" height="440" icon-name="login" />
			</div>
			<div class="right">
				<div class="logo"> VUE3-ADMIN </div>
				<div class="tips"> 欢迎使用vue3-admin </div>
				<div class="form">
					<component :is="COMPONENT_ENUM[activeName]" @changeActive="changeActive" />
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.login-wrapper {
	width: 100%;
	height: 100%;
	background: $lonjin-color-primary-30;

	.content {
		width: 900px;
		height: 550px;
		border-radius: 8px;
		background: #fff;
		overflow: hidden;

		.left,
		.right {
			width: 50%;
			height: 100%;
		}

		.left {
			background: $lonjin-color-primary;
		}

		.right {
			padding: 140px 50px 0 50px;

			.logo {
				font-size: 28px;
				line-height: 28px;
				color: $lonjin-color-primary;
				font-weight: bold;
				width: 100%;
			}

			.tips {
				color: $text-color-secondary;
				font-size: 14px;
				margin-top: 8px;
				width: 100%;
			}

			.form {
				margin-top: 34px;
			}
		}
	}
}
</style>
