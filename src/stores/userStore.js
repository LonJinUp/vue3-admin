import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            menu: [
                // {
                //     title: '首页',
                //     icon: 'home',
                //     redirect: '/',
                //     path: '',
                // },
                // {
                //     title: '基础',
                //     icon: 'operation',
                //     redirect: '/basicTemplate',
                //     children: [
                //         {
                //             title: '基础模版',
                //             icon: 'operation',
                //             path: '/basicTemplate/list',
                //             children: [
                //                 {
                //                     title: '基础列表',
                //                     icon: 'operation',
                //                     path: '/basicTemplate/list',
                //                 },
                //                 {
                //                     title: '测试',
                //                     icon: 'operation',
                //                     path: '/basicTemplate/test',
                //                 },
                //             ]
                //         }
                //     ],
                // },
            ]
        }
    },
    actions: {
        setMenuList(list) {
            this.menu = list.map(item => {
                item.icon = item.meta.icon || ''
                return item
            })
        }
    }

})
