<script setup>
import { ref } from 'vue'

let formData = ref({
	account: '',
	password: '',
	code: ''
})

let config = [
	{ key: 'account', placeholder: '请输入您的邮箱' },
	{ key: 'code', placeholder: '请输入验证码' },
	{ key: 'password', placeholder: '请输入您的密码', showPassword: true }
]

// 发送验证码
let countdown = ref(0)
let buttonText = ref('发送验证码')

const updateButtonText = () => {
	if (countdown.value > 0) {
		buttonText.value = `${countdown.value}秒后重新发送`
		countdown.value -= 1
	} else {
		buttonText.value = '发送验证码'
	}
}

const sendVerificationCode = () => {
	if (countdown.value > 0) return false
	countdown.value = 60
	setInterval(updateButtonText, 1000)
}
</script>
<template>
	<div class="login-form-wrapper">
		<div class="input-box">
			<div class="input flex-bt" v-for="item in config" :key="item.key">
				<el-input
					v-model="formData[item.key]"
					:show-password="item.showPassword"
					:placeholder="item.placeholder"
				/>
				<el-button
					v-show="item.key == 'code'"
					type="primary"
					class="sendCode"
					@click="sendVerificationCode"
					:disabled="countdown > 0"
				>
					{{ buttonText }}
				</el-button>
			</div>
		</div>
		<el-button class="button" size="large" type="primary">重置密码</el-button>
		<div class="other flex-bt">
			<div class="left">
				<span class="pointer" @click="$emit('changeActive', 'Login')">立即登录</span>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.login-form-wrapper {
	.input {
		width: 100%;
		margin-bottom: 24px;

		.sendCode {
			margin-left: 24px;
		}
	}

	.button {
		width: 100%;
	}

	.savePassword {
		margin-bottom: 24px;
	}

	.other {
		margin-top: 24px;
		font-size: 14px;

		.left {
			color: $text-color-primary;

			span {
				color: $lonjin-color-primary;
			}
		}

		.right {
			color: $lonjin-color-primary;
		}
	}
}
</style>
