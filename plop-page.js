import path from 'path'
import { cwd } from 'process'
export default plop => {
	plop.setHelper("dash", function (text) {
		return text.replace(/([A-Z])/g, '-$1').toLowerCase()
	})
	plop.setGenerator("page", {
		description: "生成page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "请输入page名？",
			},
		],
		actions: function (data) {
			const pagePath = `${path.join(cwd(), "/src/views/{{dashCase name}}/index.vue")}`
			const addRouterPath = `${path.join(cwd(), "/src/router/routes.ts")}`
			return [
				{
					type: "add",
					path: pagePath,
					templateFile: "templates/vue/index.vue",
				},
				{
					type: "append",
					path: addRouterPath,
					pattern: /(\/\/ -- APPEND PAGE ROUTER HERE --)/gi,
					template: 
`const {{camelCase name}}Router = [
	{
		path: '/{{camelCase name}}',
		name: '{{pascalCase name}}',
		component: () => import('@/views/{{name}}/index.vue'),
		meta: { title: '{{name}}', icon: '{{name}}', ruleCode: 'p{{pascalCase name}}' },
	}
]`,
				},
				{
					type: "append",
					path: addRouterPath,
					pattern: /(\/\/ -- MERGE POWER ROUTER HERE --)/gi,
					template: "  ...{{camelCase name}}Router,",
				}
			]
		},
	})
	plop.setGenerator("component", {
		
	})
}
