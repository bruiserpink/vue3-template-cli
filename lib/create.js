const path = require("path")
const fs = require("fs-extra")
const Creator = require("./Creator")
const Inquirer = require("inquirer")
// Creator.js

// 创建项目部分
module.exports = async function create(projectName, options) {
	// 获取当前工作目录
	const cwd = process.cwd()
	// 拼接得到项目目录
	const targetDirectory = path.join(cwd, projectName)
	// 判断目录是否存在
	if (fs.existsSync(targetDirectory)) {
		// 判断是否使用 --force 参数
		if (options.force) {
			// 删除重名目录(remove是个异步方法)
			await fs.remove(targetDirectory)
		} else {
			let { isOverwrite } = await new Inquirer.prompt([
				// 返回值为promise
				{
					name: "isOverwrite", // 与返回值对应
					type: "list", // list 类型
					message: "Target directory exists, Please choose an action",
					choices: [
						{ name: "Overwrite", value: true },
						{ name: "Cancel", value: false },
					],
				},
			])
			// 选择 Cancel
			if (!isOverwrite) {
				return
			} else {
				// 选择 Overwirte ，先删除掉原有重名目录
				await fs.remove(targetDirectory)
			}
		}
	}
	// 获取参数
	const res = await Inquirer.prompt([
		{
				name: 'description',
				message: '请输入项目描述'
		},
		{
				name: 'author',
				message: '请输入项目作者',
				default: 'robot'
		},
		{
			name:'template',
			type: 'list',
			message: 'choose a template of project to init',
			choices: ['react', 'vue2', 'vue3'],
			default: 'vue3',
		}
	])
  const creator = new Creator(projectName, targetDirectory);
  await creator.create('', res.template);
	creator.logTemplateUseTips();
	creator.editorPackageJson({
		name: projectName, 
		description: res.description, 
		author: res.author
	})
}
