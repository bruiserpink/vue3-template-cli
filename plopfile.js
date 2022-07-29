const path = require("path")
const cwd = process.cwd()
module.exports = plop => {
	console.log(plop)
	plop.setHelper("hump", function (text) {
		return text.replace(text[0], text[0].toUpperCase())
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
			const pagePath = `${path.join(cwd, "/src/views/{{dashCase name}}/index.vue")}`
			const addRouterPath = `${path.join(cwd, "/src/router/routes.ts")}`
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
		component: () => import('@/views/{{name}}/index.vue')
	}
]`,
				},
				{
					type: "append",
					path: addRouterPath,
					pattern: /(\/\/ -- MERGE POWER ROUTER HERE --)/gi,
					template: "  ...{{camelCase name}}Router,",
				},
				{
					type: "append",
					path: addRouterPath,
					pattern: /(\/\/ -- MERGE BASE ROUTER HERE --)/gi,
					template: "  ...{{camelCase name}}Router,",
				},
			]
		},
	})
}
