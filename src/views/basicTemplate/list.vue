<script setup>
import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import BaseSearchForm from '@/components/BaseSearchForm/index.vue'
import BaseTableList from '@/components/BaseTableList/index.vue'

const formConfig = [
	{ label: '姓名：', key: 'name', placeholder: '请输入名称', type: 'input' },
	{
		label: '爱好：',
		key: 'like',
		placeholder: '请选择爱好',
		type: 'select',
		options: [
			{ label: '踢足球', value: '1' },
			{ label: '羽毛球', value: '2' }
		]
	},
	{ label: '出生日期：', key: 'timer', placeholder: '请选择日期', type: 'date' },
	{
		label: '日期范围：',
		key: 'startAndEnTime',
		startPlaceholder: '开始日期',
		endPlaceholder: '结束日期',
		type: 'daterange'
	},
	{ label: '月份范围：', key: 'month', placeholder: '请选择月份', type: 'month' },
	{
		label: '区间值：',
		key: ['startNumber', 'endNumber'],
		startPlaceholder: '请输入',
		endPlaceholder: '请输入',
		type: 'interval'
	}
]

let formData = ref({ name: '默认' })

let clear = (obj) => {
	formData.value = cloneDeep(obj)
}

let search = (val) => {
	console.log(val)
	console.log(formData.value)
}

let tableHeader = ref([
	{ label: '商家MID', prop: 'merchantId', fixed: 'left', minWidth: '120' },
	{ label: '商家简称', prop: 'merchantAbbreviation', minWidth: '120' },
	{ label: '商家类型', prop: 'merchantType', minWidth: '120' },
	{ label: '注册时间', prop: 'registrationTime', minWidth: '120' },
	{ label: '代理商类型', prop: 'agentType', minWidth: '120' },
	{ label: '代理商等级', prop: 'agentLevel', minWidth: '120' },
	{ label: '上级代理商', prop: 'parentAgent', minWidth: '160' },
	{ label: '认证状态', prop: 'authenticationStatus', minWidth: '120' },
	{ label: '法人姓名', prop: 'legalName', minWidth: '120' },
	{ label: '代理商邀请码', prop: 'agentInviteCode', minWidth: '160' },
	{ label: '创建时间', prop: 'createTime', minWidth: '200' },
	{
		label: '操作',
		prop: 'operate',
		minWidth: '200',
		fixed: 'right',
		operation: [
			{ name: '删除', onClick: search },
			{ name: '添加', onClick: search }
		]
	}
])

let tableData = ref([
	{
		merchantId: 'MID001',
		merchantAbbreviation: 'Abbrev001',
		merchantType: 'Type1',
		registrationTime: '2023-06-30',
		agentType: 'AgentTypeA',
		agentLevel: 'Level1',
		parentAgent: 'AgentParent1',
		authenticationStatus: 'Verified',
		legalName: 'John Doe',
		agentInviteCode: 'Invite123',
		createTime: '2023-06-29 15:30:00'
	},
	{
		merchantId: 'MID002',
		merchantAbbreviation: 'Abbrev002',
		merchantType: 'Type2',
		registrationTime: '2023-06-25',
		agentType: 'AgentTypeB',
		agentLevel: 'Level2',
		parentAgent: 'AgentParent2',
		authenticationStatus: 'Unverified',
		legalName: 'Jane Smith',
		agentInviteCode: 'Invite456',
		createTime: '2023-06-28 09:45:00'
	},
	{
		merchantId: 'MID030',
		merchantAbbreviation: 'Abbrev030',
		merchantType: 'Type3',
		registrationTime: '2023-06-20',
		agentType: 'AgentTypeC',
		agentLevel: 'Level3',
		parentAgent: 'AgentParent3',
		authenticationStatus: 'Verified',
		legalName: 'Michael',
		agentInviteCode: 'Invite789',
		createTime: '2023-06-19 12:15:00'
	}
])
</script>
<template>
	<div class="list-wrapper">
		<base-search-form
			@clear="clear"
			@search="search"
			:config="formConfig"
			:data="formData"
		></base-search-form>
		<base-table-list :header="tableHeader" :data="tableData" />
	</div>
</template>
<style lang="scss" scoped>
.list-wrapper {
	width: 100%;
}
</style>
