import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu-store', {
	state: () => {
		return {
			menu: []
		};
	},
	actions: {
		setMenuList(list) {
			this.menu = list.map((item) => {
				item.icon = item.meta.icon || '';
				return item;
			})
		}
	}
})
