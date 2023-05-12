import { compCreator } from "./lib/CompCreator.js"
import path from "path"
import { cwd } from "process"
export default plop => {
	plop.setHelper("pathName", function (input) {
		console.log(input)
		return path.basename(input)
	})
	plop.setGenerator("comp", {
		description: "生成component",
		prompts: [
			{
				type: "input",
				name: "path",
				message: "请输入component目标路径？",
			},
		],
		actions: function () {
			const addRouterPath = `${path.join(cwd(), "/src/router/routes.ts")}`
			console.log(addRouterPath)
			const res = [
				{
					type: "add",
					path: compCreator.targetPath,
					templateFile: "templates/vue/component.vue",
				},
			]
			if (compCreator.options.children) {
				res.push({
					type: "append",
					path: addRouterPath,
					pattern: /(\/\/ -- APPEND CHILD ROUTER HERE --)/gi,
					template: `    children: [
			{
				path: '/{{camelCase path}}',
				name: '{{pathName path}}',
				component: () => import('@/views//index.vue'),
				meta: { title: '线索记录', ruleCode: 'pAdminClueLog' }
			}
		],`,
				})
			}
			return res
		},
	})
}
