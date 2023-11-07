module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
		'plugin:vue/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		},
		{
			files: ['*.vue'],
			rules: {
				'no-undef': 'off',
				'vue/no-setup-props-destructure': 'off',
				'vue/multi-word-component-names': 'off',
				'vue/no-mutating-props': 'off',
				'no-unused-vars': 0,
				'vue/valid-attribute-name': 'off'
			}
		}
	],
	// 参考vue官方推荐,替换默认parser
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue'],
	rules: {
		'prettier/prettier': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': 'off',
		'no-debugger': 'off'
	}
}
