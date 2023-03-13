import { createRouter, createWebHistory } from 'vue-router'
import { getStorage, clearAll } from 'lonjin-helper'
import { useUserStore } from '../stores/userStore'
import Layout from '../layout/index.vue'

const NOTFOUND = {
	path: '/:pathMatch(.*)',
	name: 'NotFound',
	redirect: '/404'
}

let routes = [
	{
		path: '/',
		redirect: { path: '/layout' }
	},
	{
		path: '/login',
		name: 'login',
		meta: { title: '欢迎登录' },
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404.vue')
	},
	{
		path: '/layout',
		name: 'layout',
		component: Layout,
		redirect: {
			path: '/dashboard'
		},
		meta: { title: '首页' },
		children: [
			// {
			// 	path: '/dashboard',
			// 	name: 'Dashboard',
			// 	component: () => import('@/views/dashboard.vue'),
			// 	meta: { title: '首页', icon: 'dashboard' }
			// },
			// {
			// 	path: '/basicTemplate',
			// 	name: 'basicTemplate',
			// 	redirect: '/basicTemplate/list',
			// 	meta: { title: '基础', icon: '' },
			// 	children: [
			// 		{
			// 			path: '/basicTemplate/list',
			// 			name: 'list',
			// 			meta: { title: '基础列表', icon: '' },
			// 			component: () => import('@/views/basicTemplate/list.vue'),
			// 		},
			// 	]
			// },
		]
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
})

// 需要过滤掉的路由
const filterRoutes = []
const ELOGINSTATE = {
	'ISLOGIN': 'login'
}

router.beforeEach((to, from, next) => {
	const store = useUserStore()
	const menu = store.menu
	let userinfo = getStorage('userinfo')
	const token = getStorage('token') || ''
	const currentRouters = router.options.routes

	// 未登录 去的是登录页面
	if (!token && to.name === ELOGINSTATE.ISLOGIN) {
		console.log('未登录 去的是登录页面')
		clearAll()
		next()
	} else if (!token && to.name !== ELOGINSTATE.ISLOGIN) {
		// 未登录 去的不是登录页面
		console.log('未登录 去的不是登录页面')
		next({ name: ELOGINSTATE.ISLOGIN })

	} else if (token && to.name === ELOGINSTATE.ISLOGIN) {
		// 已登录 去的是登录页面
		console.log('已登录 去的是登录页面')
		next({ path: '/dashboard' })
	} else if (token && to.name !== ELOGINSTATE.ISLOGIN) {
		// 已登录但是没有用户菜单
		console.log(menu.length, '===menu.length')
		if (menu.length == 0) {
			console.log('已登录但是没有用户菜单')
			let newRoutes = generateRouter(userinfo.routes)
			const layout = routes.find((item) => item.name == "layout")
			layout.children = [...newRoutes]
			store.setMenuList(newRoutes)
			router.addRoute(layout)
			router.addRoute(NOTFOUND)
			next({ ...to, replace: true })
		} else {
			next()
		}

	}
})


function generateRouter(userRouters) {
	const modules = import.meta.glob("../views/**/**.vue")

	let newRouters = userRouters.map((router) => {
		const isParent = router.children && router.children.length || 0
		let routes = {
			path: router.path,
			name: router.name,
			meta: router.meta,
		}
		console.log(isParent, '======isParent')
		if (isParent) {
			routes.redirect = router.children[0].path
		} else {
			routes.component = modules[
				/* @vite-ignore */ `../views${router.path}/${router.name}.vue`
			]
			console.log(routes.component, '===routes.component===', router.name)
		}
		routes && router.children && (routes.children = generateRouter(router.children))
		console.log(routes, '===routes')
		return routes
	})
	return newRouters
};

export default router
