import { defineStore } from 'pinia'
import { findTab, removeTabItem } from './helper'
import router from '@/router'

export const useTabStore = defineStore('tab-store', {
	state: () => {
		return {
			tab: [],
			tabActive: 0
		};
	},
	actions: {
		/**
		 * 初始化tab
		 */
		initTab() {
			this.tab = [];
			this.tabActive = 0;
		},

		/**
		 * 设置路由
		 * @param {Object} route
		 */
		addTabItem(route) {
			const tabActive = findTab(this.tab, route.path);
			if (tabActive != null) {
				this.tabActive = tabActive;
			} else {
				this.tab.push(route);
				this.tabActive = this.tab.length - 1;
			}
		},

		/**
		 * 删除单个路由
		 * @param {*} targetIndex 目标路由
		 */
		removeTabItem(targetIndex) {
			const tab = removeTabItem(this.tab, targetIndex, 'current');
			// 如果全部删除， 回到首页
			if (tab.length === 0) {
				this.initTab();
				router.replace({ path: '/layout' });
			} else {
				this.tabActive = targetIndex === 0 ? 0 : targetIndex - 1;
				this.tab = tab;
				const { path, params = {}, query = {} } = this.tab[this.tabActive];
				router.push(path, params, query);
			}
		},

		/**
		 * 删除其他路由
		 * @param {*} targetIndex 保留路由
		 */
		removeOtherTabItem(targetIndex) {
			if (this.tab.length === 1) {
				return false;
			}
			const tab = removeTabItem(this.tab, targetIndex, 'other');
			this.tabActive = targetIndex - 1;
			this.tab = tab;
			const { path, params = {}, query = {} } = this.tab[this.tabActive];
			router.push(path, params, query);
		},

		clearTab() {
			this.initTab();
			router.replace({ path: '/layout' });
		}
	},
	persist: {
		enabled: true,
		storage: window.sessionStorage
	}
})
