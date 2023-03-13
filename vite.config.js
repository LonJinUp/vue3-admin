import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/components/SvgIcon/svgBuilder.js'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
		  scss: {
			additionalData: '@use "@/assets/main.scss" as *; @use "src/assets/elementStyle/index.scss" as *;'  //引入多个
		  }
		}
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
		}),
		svgBuilder('./src/svg/') // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
	],
	resolve: {
		alias: {
		'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
