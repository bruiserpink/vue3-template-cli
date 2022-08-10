import { compCreator } from './lib/CompCreator.js'
import path from 'path'
export default plop => {
	plop.setHelper("pathName", function (input) {
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
			console.log(compCreator.targetPath)
			return [
				{
					type: "add",
					path: compCreator.targetPath,
					templateFile: "templates/vue/component.vue",
				},
			]
		},
	})
}
