<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits(['changeActive'])
const { proxy } = getCurrentInstance()

let formData = reactive({
    account: 'admin',
    password: 'admin'
})

let config = [
    { key: 'account', placeholder: '请输入您的账号' },
    { key: 'password', placeholder: '请输入您的密码', showPassword: true },
]

// 记住密码
let isSavePassWord = ref(false)

// 表单验证
const rules = reactive({
    account: [
        { required: true, message: '请输入您的账号', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: '请输入您的密码', trigger: ['blur', 'change'] },
    ]
})

const ruleFormRef = ref()

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            proxy.$setStorage('token', 'AHD8230F872FFCG9AK')
            proxy.$setStorage('userinfo', {
                name: '超级管理员',
                routes: [
                    {
                        path: '/dashboard/index',
                        name: 'Dashboard',
                        redirect: {
                            path: '/dashboard/index'
                        },
                        meta: { title: '首页', icon: 'home' }
                    },
                    {
                        path: '/basicTemplate',
                        name: 'basicTemplate',
                        redirect: '/basicTemplate/list',
                        meta: { title: '基础', icon: 'operation' },
                        children: [
                            {
                                path: '/basicTemplate/list',
                                name: 'list',
                                meta: { title: '基础列表', icon: '' }
                            },
                            {
                                path: '/basicTemplate/test',
                                name: 'test',
                                meta: { title: '测试', icon: '' }
                            },
                        ]
                    },
                ]
            })

            router.replace({ path: '/layout' })

        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>
<template>
    <div class="login-form-wrapper">
        <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
            <div class="input-box">
                <div class="input" v-for="item in config" :key="item.key">
                    <el-form-item label-width="auto" :prop="item.key">
                        <el-input v-model="formData[item.key]" :show-password="item.showPassword"
                            :placeholder="item.placeholder" />
                    </el-form-item>
                </div>
            </div>
            <div class="savePassword flex-start">
                <el-checkbox v-model="isSavePassWord" label="记住密码" size="large" />
            </div>
            <el-button class="button" size="large" @click="submitForm(ruleFormRef)" type="primary">立即登录</el-button>
        </el-form>
        <div class="other flex-bt">
            <div class="left">
                没有账号？ <span class="pointer" @click="$emit('changeActive', 'Register')">立即注册</span>
            </div>
            <div class="right pointer" @click="$emit('changeActive', 'ResetPassword')">忘记密码</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login-form-wrapper {
    .input {
        width: 100%;
        margin-bottom: 24px;

        &:last-child {
            margin-bottom: 0;
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